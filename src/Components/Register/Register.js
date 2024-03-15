import React, { Component } from 'react';


class Register extends Component {

	constructor(){

    super();
    this.state={
     
      email: '',
      password: '',
      name:''
            }
               } ;

onEmailChange = (event) =>{
	this.setState({email : event.target.value})
};

onPasswordChange = (event) =>{
	this.setState({password : event.target.value})
};

onNameChange = (event) =>{
	this.setState({name : event.target.value})
};
saveAuthTokenSession = (token) => {
	window.sessionStorage.setItem('token', token)
}
onSubmitRegister = ()=>{
	if(window.sessionStorage.getItem('token')){
		window.sessionStorage.removeItem('token');
	}
  fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/register`, {
  	method: 'post',
  	headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    	email: this.state.email,
    	password: this.state.password,
    	name: this.state.name,

    })})
    .then(res => res.json())
    .then(data => {
    	if(data.success){
			this.saveAuthTokenSession(data.token)
			fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/profile/${data.userId}`, {
			  method: 'get',
				headers: {
			  'Content-Type': 'application/json',
			  'Authorization': data.token
			}
			 })
			 .then(res => res.json())
			 .then(user => {
			  if(user && user.email) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			  }
			 })
			 .catch(console.log)
    }})};
render(){
	return(
		<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        className="black-hover pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="name"  
			        id="name" 
			        onChange = {this.onNameChange}/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        className="black-hover pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        onChange = {this.onEmailChange}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
			        <input 
			        className="black-hover b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange = {this.onPasswordChange}/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={this.onSubmitRegister}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" />
			    </div>
			    
			  </div>
			</main>
		</article>
		);

}
	
	}



export default Register;