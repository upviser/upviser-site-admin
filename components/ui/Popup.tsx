import React, { PropsWithChildren } from 'react'

interface Props {
    popup: any
    setPopup: any
}

export const Popup: React.FC<PropsWithChildren<Props>> = ({ children, popup, setPopup }) => {
  return (
    <div onClick={() => {
        if (!popup.mouse) {
          setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
          setTimeout(() => {
            setPopup({ ...popup, view: 'hidden', opacity: 'opacity-0' })
          }, 200)
        }
      }} className={`${popup.view} ${popup.opacity} fixed top-0 left-0 z-50 flex w-full h-full bg-black/20 transition-opacity duration-200 dark:bg-black/40`}>
        <div onMouseEnter={() => setPopup({ ...popup, mouse: true })} onMouseLeave={() => setPopup({ ...popup, mouse: false })} onMouseMove={() => setPopup({ ...popup, mouse: true })} className={`${popup.opacity === 'opacity-1' ? 'scale-1' : 'scale-90'} transition-transform duration-200 p-5 rounded-xl border bg-white m-auto w-[500px] max-h-[600px] overflow-y-auto flex flex-col gap-4 text-black shadow-popup dark:shadow-popup-dark dark:text-white dark:border-neutral-700 dark:bg-neutral-800`}>
          { children }
        </div>
      </div>
  )
}
