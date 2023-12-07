import React from 'react'

const AuthFieldsContainer = ({children, classNames}) => {
  return (
    <div className={`${classNames} flex-shrink-0  shadow-card_2_shadow bg-app-background-2 p-5 `}>
        {children}
    </div>
  )
}

export default AuthFieldsContainer

