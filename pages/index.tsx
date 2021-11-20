import type { NextPage } from 'next'
import Image from 'next/image'
import { LoginWithGithub } from '../firebase'

const Login: NextPage = () => {
  return (
    <div className="flex">
      <div className="flex justify-center items-center w-5/12">
        <div className="text-center">
          <div className="block">
            <Image
              src="/login/login_logo.png"
              alt="泉"
              width="56px"
              height="60px"
            />
          </div>
          <div className="block mt-6">
            <Image
              src="/login/login_title.png"
              alt="泉"
              width="206px"
              height="36px"
            />
          </div>
          <div className="mt-2">
            <Image
              src="/login/login_description.png"
              alt="泉"
              width="258px"
              height="20px"
            />
          </div>
          <div className="mt-10 cursor-pointer" onClick={LoginWithGithub}>
            <Image
              src="/login/Signin.png"
              alt="泉"
              width="215px"
              height="50px"
            />
          </div>
        </div>
      </div>
      <figure className="relative w-7/12 h-screen">
        <Image
          src="/login/login_top_img.png"
          alt="泉"
          layout="fill"
          objectFit="fill"
          priority={true}
        />
      </figure>
    </div>
  )
}

export default Login
