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
      if(this.props.arrage.pos){
        styleObj=this.props.arrage.pos;
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


   rearrage(centerIndex){
     var imgsArrageArr=this.state.imgsArrageArr,
     Constant=this.Constant,
     centerPos=Constant.centerPos,
     hPosRange=Constant.hPosRange,
     vPosRange=Constant.vPosRange,
     hPosRangeLeftSecX=hPosRange.leftSecX,
     hPosRangeRightSecX=hPosRange.rightSecX,
     hPosRangeY=hPosRange.y,
     vPosRangeTopY=vPosRange.topY,
     vPosRangeX=vPosRange.x,

     imgsArrageTopArr=[],
     topImgNum=Math.ceil(Math.random()*2),
     topImgSpliceIndex=0,
     imgsArrageCenterArr=imgsArrageArr.splice(centerIndex,1)

     imgsArrageCenterArr[0].pos=centerPos;
     topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrageArr.length0topImgNum))

     imgsArrageTopArr=imgsArrageArr.splice(topImgSpliceIndex,topImgNum)
     imgsArrageTopArr.forEach(function(value,index){
       imgsArrageTopArr[index].pos={
         top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
         left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
       }
     });
     for(var i=0,j=imgsArrageArr.length,k=j/2;i<j;i++){
       var hPosRangeLORX=null;
       if(i<k){
         hPosRangeLORX=hPosRangeLeftSecX;
       }else{
         hPosRangeLORX=hPosRangeRightSecX;
       }
       imgsArrageArr[i].pos={
         top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
         left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
       }
     }

     if(imgsArrageTopArr&&imgsArrageTopArr[0]){
       imgsArrageArr.splice(topImgSpliceIndex,0,imgsArrageTopArr[0]);
     }
     imgsArrageArr.splice(centerIndex,0,imgsArrageCenterArr[0])
     this.setState({
       imgsArrageArr:imgsArrageArr
     })
  },
  getInitialState(){
    return{
      imgsArrageArr:[]
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

    this.rearrage(0);
  },
  render() {
    var controllerUnits=[],
    imgFigures=[];
    imageDatas.forEach(function(value,index) {
      if(!this.state.imgsArrageArr[index]){
        this.state.imgsArrageArr[index]={
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={"imgFigure"+index} arrage={this.state.imgsArrageArr[index]}/>)
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
