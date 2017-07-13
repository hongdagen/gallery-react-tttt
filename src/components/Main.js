require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageDatas=require('../data/imageData.json');
function genImageURl(imageDatasArr){
  for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageData=imageDatasArr[i];
    singleImageData.imageURL=require('../images/'+singleImageData.filename)
  }
  return imageDatasArr
}
imageDatas=genImageURl(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
     <section className="stage">
       <section className="img-sec">

       </section>
       <nav className="controller-nav"></nav>
       </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;