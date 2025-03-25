import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { AuthContext } from '../../component/AuthContext/AuthProvider';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { signIn } = useContext(AuthContext);

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const rememberMe = form.remember.checked;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: "animate__animated animate__fadeInUp animate__faster",
          hideClass: "animate__animated animate__fadeOutDown animate__faster"
        });

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        navigate(from, { replace: true });
      })
      .catch(error => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Helmet>
        <title>SalimChatbot | Login</title>
      </Helmet>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome back</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              defaultValue={localStorage.getItem('rememberedEmail') || ''}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
         
          
          <button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md text-lg transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-lg mt-8">
          Don't have an account?{' '}
          <Link to="/signUp" className="text-teal-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;