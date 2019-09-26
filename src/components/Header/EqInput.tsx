import React, { useState } from 'react'
import './Eqinput.scss'

const EqInput: React.FC = () => {
  const [placeholderText, setPlaceholderText] = useState('搜索')
  const [focusClass, setFocusClass] = useState('')
  const onFocus = () => {
    setFocusClass('eq-input__focus')
    setTimeout(() => setPlaceholderText(''), 200)
  }
  const onBlur = () => {
    setFocusClass('')
    setPlaceholderText('搜索')
  }
  return (
    <div className="eq-input">
      <input
        type="text"
        placeholder={placeholderText ? '' : '搜索'}
        className={`eq-input__inner ${focusClass}`}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <span className={`eq-input__placeholder ${focusClass}`}>
        <i className="iconfont icon-search"></i>
        {placeholderText}
      </span>
    </div>
  )
}

export default EqInput
