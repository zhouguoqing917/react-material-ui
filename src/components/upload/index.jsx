import React, { Component } from "react";
import Upload from "rc-upload";
import "./Uploader.scss";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ViewIcon from "@material-ui/icons/RemoveRedEye";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

//https://github.com/react-component/upload
const styles = () => ({
  addIcon: {
    fontSize: 45
  },
  progress: {
    "margin-top": "25px"
  }
});

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImagesFile: [], // 上传成功的例子
      uploadedImagesURL: [],
      open: false,
      imgIndx: "", //for modal dialog
      loader: "inline-block",
      uploadImg: "none",
      totalImagesUploaded: 0,
      validateDisplay: "none",
      // eslint-disable-next-line react/prop-types
      showMessage: !!props.showMessage || false,
      msg: ""
    };
    this.supportTypes = ["jpeg", "jpg", "png", "bmp", "gif"];
  }
  componentDidMount() {}

  onProgress = file => {
    console.log("onProgress", file.name);
  };
  onStart = file => {
    console.log("onStart", file.name);
  };
  handleSuccess = (response, file) => {
    this.alerts("success " + file.name);
    this.props.onUploadSuccess(file);
  };
  alerts = (msg = "") => {
    this.setState({ msg, showMessage: true });
  };
  handleCloseAlerts = () => {
    this.setState({ showMessage: false });
  };
  handleError = (err, response, file) => {
    console.log("file", file);
    let fileName = file.name;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (this.supportTypes.includes(extFile)) {
      console.log("pics", this.state.totalImagesUploaded);
      if (this.state.totalImagesUploaded < this.props.max) {
        let preUplodedFile = this.state.uploadedImagesFile;
        let preUplodedURL = this.state.uploadedImagesURL;
        let fileURL = URL.createObjectURL(file);
        preUplodedURL.push(fileURL);
        preUplodedFile.push(file);
        this.setState({
          uploadedImagesFile: preUplodedFile,
          uploadedImagesURL: preUplodedURL
        });
        this.increaseCount();
        this.props.onUploadSuccess(this.state.uploadedImagesFile);
      } else {
        this.setState({
          validateDisplay: "block"
        });
      }
    } else {
      this.alerts("Only jpg/jpeg and png files are allowed!");
    }
  };

  beforeUpload = file => {
    if (file) {
      // 选中文件
      let { name, size } = file;
      if (name && name.indexOf(".") > -1) {
        // name一定不空，因为accept里限定了不能没有后缀
        let typeName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
        if (this.supportTypes.includes(typeName)) {
          // 支持的图片类型
          // 再走其他判断逻辑
        } else {
          this.alerts(
            "该图片类型不支持,请转换为以下类型:" + this.supportTypes.toString()
          );
          return false;
        }
      } else {
        this.alerts("该图片无法上传");
        return false;
      }

      if (size && size > 2048 * 1024) {
        this.alerts("上传的图片大小请不要超过2M");
        return false;
      }
    } else {
      this.alerts("请选择要上传的图片");
      return false;
    }
    return true;
  };

  deleteFile = index => {
    let filearray = this.state.uploadedImagesFile;
    let URLarray = this.state.uploadedImagesURL;
    filearray.splice(index, 1);
    URLarray.splice(index, 1);
    // console.log('pics',this.state.totalImagesUploaded)
    this.setState({
      uploadedImagesFile: filearray,
      uploadedImagesURL: URLarray
    });
    this.setState({
      totalImagesUploaded: this.state.totalImagesUploaded - 1
    });
    this.props.onUploadSuccess(this.state.uploadedImagesFile);
    // console.log('pics',this.state.totalImagesUploaded)
  };

  //modal
  handleClickOpen = index => {
    let imgURL = this.state.uploadedImagesURL[index];
    this.setState({
      imgIndx: imgURL,
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  switchLoader = () => {
    this.setState({
      loader: "none",
      uploadImg: "block"
    });
  };
  increaseCount = () => {
    this.setState({
      totalImagesUploaded: this.state.totalImagesUploaded + 1
    });
  };

  render() {
    const { classes } = this.props;
    const props = this.props;
    return (
      <div className="upload-box-container">
        {this.state.uploadedImagesURL.map((value, index) => {
          return (
            <div key={index + 100}>
              <div className="img-box-loader">
                <CircularProgress
                  style={{ display: this.state.loader }}
                  className={classes.progress}
                />
              </div>
              <div
                className="img-container"
                style={{ display: this.state.uploadImg }}
              >
                <img
                  className="img-box"
                  src={value}
                  onLoad={() => {
                    setTimeout(this.switchLoader, 1000);
                  }}
                />
                <div className="img-btns">
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.deleteFile(index);
                    }}
                  />
                  <ViewIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleClickOpen(index);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="upload-box-wrap">
          <Upload
            action={props.action}
            onSuccess={this.handleSuccess}
            onError={(err, response, file) => {
              this.handleError(err, response, file);
            }}
            accept=".jpeg, .jpg, .png, .bmp, .gif"
            beforeUpload={(file, files) => {
              return this.beforeUpload(file, files);
            }}
            onStart={file => {
              this.onStart(file);
            }}
            onProgress={file => {
              this.onProgress(file);
            }}
          >
            <div className="upload-box">
              <AddIcon className={classes.addIcon} />
              <p className="img-text">Upload</p>
            </div>
          </Upload>
          <p
            style={{ display: this.state.validateDisplay }}
            className="img-validate"
          >
            {/* eslint-disable-next-line react/prop-types */}
            You can only select {this.props.max} pics.
          </p>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="Image"
          open={this.state.open}
          xt="点击浏览大图"
        >
          <img src={this.state.imgIndx} />
        </Dialog>
      </div>
    );
  }
}

Uploader.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  name: PropTypes.string,
  multipart: PropTypes.bool,
  directory: PropTypes.bool,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onStart: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  headers: PropTypes.object,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  beforeUpload: PropTypes.func,
  customRequest: PropTypes.func,
  onReady: PropTypes.func,
  withCredentials: PropTypes.bool,
  supportServerRender: PropTypes.bool,
  openFileDialogOnClick: PropTypes.bool,
  max: PropTypes.number
};
Uploader.defaultProps = {
  max: 20
};
export default withStyles(styles)(Uploader);
