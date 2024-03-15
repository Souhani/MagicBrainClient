import React, { Component } from 'react';

class signin extends Component {
 
constructor(){

    super();
    this.state={
     
      signInEmail: '',
      signInPassword: '',
    }
  } ;

onEmailChange = (event) => {
	this.setState({signInEmail : event.target.value})
};

onPasswordChange = (event) => {
	this.setState({signInPassword : event.target.value})
};

saveAuthTokenSession = (token) => {
	window.sessionStorage.setItem('token', token)
}

onSubmitSignIn = () => {
	if (window.sessionStorage.getItem('token')) {
	  window.sessionStorage.removeItem('token');
	}
	fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/signin`, {
	  method: 'post',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({
		email: this.state.signInEmail,
		password: this.state.signInPassword
	  })
	})
	.then(res => res.json())
	  .then(data => {
		if (data.success) {
		  this.saveAuthTokenSession(data.token);
		  fetch(`https://smartbrainapi-00c66c6e2818.herokuapp.com/profile/${data.userId}`, {
			method: 'get',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': data.token
			}
		  })
			.then(res => res.json())
			.then(user => {
			  if (user && user.email) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			  }
			})
			.catch(err => console.log(err)); // handle error here
		}
	  })
	  .catch(err => console.log(err)); // handle error here
  };
  
	render(){
    const  {onRouteChange} = this.props;
	  return(  
		<article className="br3 ba  mv4 b--black-10 mv4  w-50-m w-25-l  shadow-5 center">
		 <main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
		      onClick={this.onSubmitSignIn}
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      type="submit" 
		      value="Sign in" />
		    </div>
		    <div className="lh-copy mt3">
		      <p  
		       onClick={()=>onRouteChange('Register')}
		       className="f6 link dim black db pointer">Register</p>
		    </div>
		  </div>
		 </main>
		</article>
		    );
}

} 

export default signin;