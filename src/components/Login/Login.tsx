import logo from '../../assets/logo.svg'
import loginSvg from '../../assets/login.svg'
import './Login.css'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string 
  password: string
}

const Login = ( { handleLogin }: any ) => {
  const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>();

  return (
    <div className='body'>
      <div className='logo_container'>
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div className='login_container'>
        <div className='login_window'>
          <div className='login_text'>
            <h1>
              Welcome, stranger!
            </h1>
            <p>Please log in to this form if you wish to pass the exam</p>
          </div>

          <form className='form' onSubmit={handleSubmit(handleLogin)}>
            <input type="email" placeholder='Email' {...register("email", { pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi })} className="input_form" />
            {errors.email && <span role="alert" className='error-text'>Enter a valid email</span>}
            
            <input type="password" placeholder='Password' {...register('password', { required: true })} className="input_form"/>
            {errors.password && <span role="alert" className='error-text'>Enter a valid password</span>}

            <div className="login_btn">
              <button type='submit'>
                <span>Login</span>
                <img src={loginSvg} alt="login" className='login_img' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login