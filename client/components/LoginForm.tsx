import React from 'react'
import LoginFunc from '@/pages/api/LoginFunc'

function LoginForm({ handleModalToggle, isModalVisible }: { handleModalToggle: () => void, isModalVisible: boolean }) {
    const {handleLoginUser} = LoginFunc();
  return (
    <div id="authentication-modal" tabIndex={-1} aria-hidden={!isModalVisible ? "true" : "false"} 
        className={`fixed top-0 left-0 right-0 z-50 ${!isModalVisible ? 'hidden' : ''} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-md max-h-full m-auto mt-20">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" onClick={handleModalToggle}
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form className="space-y-6" onSubmit={(e) =>  handleLoginUser(e)}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="mail" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                            Not registered? <a href="/createAccount" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
