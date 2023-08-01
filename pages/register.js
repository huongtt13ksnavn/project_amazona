import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      const result = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      if (result.error) {
        console.log(result.error);
        toast.error(result.error);
        return;
      }

      const resultLogin = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (resultLogin.error) {
        console.log(result.error);
        toast.error(result.error);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    }
  };
  return (
    <Layout title="Register">
      <form
        action="post"
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="w-full"
            name="name"
            type="name"
            autoFocus
            autoComplete="username"
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full"
            name="email"
            type="email"
            autoFocus
            autoComplete="username"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="w-full"
            name="password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password is more than 5 char' },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            className="w-full"
            name="confirm-password"
            type="password"
            autoComplete="current-password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              minLength: {
                value: 6,
                message: 'Confirm Password is more than 5 char',
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button" type="submit">
            Register
          </button>
        </div>
        <div className="mb-4">Have an account? &nbsp;</div>
        <Link className="text-blue-500" href={'/login'}>
          Login
        </Link>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
