require('normalize.css/normalize.css');
require('styles/App.scss');


import React from 'react';
import ReactDOM from 'react-dom'

let imageDatas=require('../data/imageData.json');
function genImageURl(imageDatasArr){
  for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageData=imageDatasArr[i];
    singleImageData.imageURL=require('../images/'+singleImageData.filename)
  }
  return imageDatasArr
}
imageDatas=genImageURl(imageDatas)

function getRangeRandom(low,high){
 return Math.ceil(Math.random()*(high-low)+low)

}

class ImgFigure extends React.Component{
  render(){
      var styleObj={};
      if(this.props.arrange.pos){
        styleObj=this.props.arrange.pos;
      }
    return(
     <figure className="img-figure" style={styleObj}>
       <img src={this.props.data.imageURL} alt={this.props.data.title}/>
       <figcaption>
         <h2 className="img-title">{this.props.data.title}</h2>
       </figcaption>
     </figure>
    )
  }
}


var AppComponent=React.createClass({
  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  },


   rearrange(centerIndex){
     var imgsArrangeArr=this.state.imgsArrangeArr,
     Constant=this.Constant,
     centerPos=Constant.centerPos,
     hPosRange=Constant.hPosRange,
     vPosRange=Constant.vPosRange,
     hPosRangeLeftSecX=hPosRange.leftSecX,
     hPosRangeRightSecX=hPosRange.rightSecX,
     hPosRangeY=hPosRange.y,
     vPosRangeTopY=vPosRange.topY,
     vPosRangeX=vPosRange.x,

     imgsArrangeTopArr=[],
     topImgNum=Math.ceil(Math.random()*2),
     topImgSpliceIndex=0,
     imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1)

     imgsArrangeCenterArr[0].pos=centerPos;
     topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length0topImgNum))

     imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum)
     imgsArrangeTopArr.forEach(function(value,index){
       imgsArrangeTopArr[index].pos={
         top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
         left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
       }
     });
     for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
       var hPosRangeLORX=null;
       if(i<k){
         hPosRangeLORX=hPosRangeLeftSecX;
       }else{
         hPosRangeLORX=hPosRangeRightSecX;
       }
       imgsArrangeArr[i].pos={
         top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
         left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
       }
     }

     if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
       imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
     }
     imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0])
     this.setState({
       imgsArrangeArr:imgsArrangeArr
     })
  },
  getInitialState(){
    return{
      imgsArrangeArr:[]
    }
  },
  componentDidMount(){
    var stageDom=ReactDOM.findDOMNode(this.refs.stage),
        stageW=stageDom.scrollWidth,
        stageH=stageDom.scrollHeight,
        halfStageW=Math.ceil(stageW/2),
        halfStageH=Math.ceil(stageH/2)

    var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW=imgFigureDOM.scrollWidth,
        imgH=imgFigureDOM.scrollHeight,
        halfImgW=Math.ceil(imgW/2),
        halfImgH=Math.ceil(imgH/2)

    this.Constant.centerPos={
      left:halfStageW-halfImgW,
      top:halfStageH-halfStageH
    }
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW *3;
    this.Constant.hPosRange.rightSecX[0] =halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] =stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  },
  render() {
    var controllerUnits=[],
    imgFigures=[];
    imageDatas.forEach(function(value,index) {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={"imgFigure"+index} arrange={this.state.imgsArrangeArr[index]}/>)
    }.bind(this));
    return (
     <section className="stage" ref="stage">
       <section className="img-sec">
         {imgFigures}
       </section>
       <nav className="controller-nav">
         {controllerUnits}
       </nav>
       </section>
    );
  }
})
// AppComponent.defaultProps = {
// })

module.exports=AppComponent
