import React from 'react'

const AuthFieldsContainer = ({ children, classNames }) => {
  return (
    <div className={`${classNames} flex-shrink-0 shadow-card_2_shadow bg-app-background-2 p-5 mx-auto lg:w-[600px] md:max-w-screen-lg sm:max-w-screen-lg`}>
      {children}
    </div>
  )
}

export default AuthFieldsContainer
