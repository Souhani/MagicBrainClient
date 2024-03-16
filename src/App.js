import React,{ Component } from 'react';
import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Modal from './Components/Modal/Modal';
import Profile from './Components/Profile/Profile'
//  import ParticlesBackground  from "./Components/Particles/ParticlesBackground";

const initialState = {
  loading: false,
  input:'',
  imgUrl:'',
  boxes: [],
  sentiment:"",
  route: 'signin',
  SignedIn: false,
  isPrrofileOpen: false,
  user: {
        id: '',
        name: '',
        age: '',
        email: '',
        entries: 0,
        joined: ''
}};

class App extends  Component {

  constructor(){
    super();
    this.state= initialState;
  } ;

  loadUser = (data)=>{
    this.setState({user: {
        id: data.id,
        name: data.name,
        age: data.age,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
   }

 componentDidMount () {
  fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/signin`, {
  	method: 'post',
  	headers: {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.getItem('token')
    }})
   .then(res => res.json())
   .then(data => {if(data && data.id){
     fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/profile/${data.id}`, {
      method: 'get',
  	  headers: {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.getItem('token')
    }
     })
     .then(res => res.json())
     .then(user => {
      if(user && user.email) {
        this.loadUser(user);
        this.onRouteChange('home');
      }
     })
     .catch(console.log)
   }})
   .catch(console.log)
 }

  calculateFaceLocations = (data)=>{
    if(data.outputs) {
      const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const facesArray = clarifaiFaces.map(face => ({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }))
      return facesArray;
    }
    return null;
  }

  facebox = boxes => {
    if(boxes) {
      this.setState({boxes: boxes})
    }
  }
  onInputChange = (event)=>{
    this.setState({input:event.target.value})
         }
  onButonSubmit = ()=>{
     this.setState({imgUrl : this.state.input });
     this.setState({loading:true})
     fetch(
      `https://smartbrainapi-00c66c6e2818.herokuapp.com/imageUrl/${this.state.user.id}`,
       { method: 'put',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
         },
         body:JSON.stringify({input:this.state.input})
       })
         .then(data=> data.json()) 
         .then(response => {
            if(response){
              this.setState({loading:false})
              this.setState({sentiment:response.face_sentiment.outputs[0].data.concepts[0].name});
              window.scrollTo(0, document.body.scrollHeight)
              fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/image/${this.state.user.id}`, {
                method: 'put',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': window.sessionStorage.getItem('token')
                },
                body:JSON.stringify({
                  id:this.state.user.id            
                }
                )})
              .then(response => response.json())
              .then(data =>  this.setState(Object.assign(this.state.user,{entries: data.entries})))
              .catch(console.log)}
            this.facebox(this.calculateFaceLocations(response.face_detection))})
        .catch(err=> console.log(err))
  }

  onRouteChange = (route)=>{
   if(route === 'home'){
      this.setState({SignedIn:true})
   }else if(route === 'signout'){
      return this.setState(initialState)
    }
    this.setState({route: route});
  }
  toggleModal = () => {
    this.setState(prevstate => (
      {...prevstate, 
          isPrrofileOpen: !prevstate.isPrrofileOpen }
      ))
  }

  render(){
  const {input, imgUrl, boxes, route, SignedIn, isPrrofileOpen, user} = this.state;
  return (
    <div className="App">
      <div className="fixed" style={{height:"100vh", width:"100%", zIndex:"-9999"}}>
    {/* <ParticlesBackground/> */}
      </div>
      <Navigation
       SignedIn = {SignedIn}
       onRouteChange = {this.onRouteChange}
       clearImge = {this.clearImge}
       toggleModal={this.toggleModal}/>
     {route === 'home' 
      ?<div>
          <Logo />
         {isPrrofileOpen && (
          <Modal>
             <Profile 
             isPrrofileOpen = {isPrrofileOpen}
             toggleModal = {this.toggleModal}
             user={user}
             loadUser={this.loadUser} />
          </Modal>)}
          <ImageLinkForm onInputChange = {this.onInputChange} onButonSubmit={this.onButonSubmit} loading={this.state.loading} />
          <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
          <FaceRecognition boxes = {boxes} imgUrl = {imgUrl} sentiment={this.state.sentiment} loading={this.state.loading}/>
        </div>
      :(route === 'signin'
         ?<Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
         :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>)}
         
    </div>
  );}
}

export default App;
