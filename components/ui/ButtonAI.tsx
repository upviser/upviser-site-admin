import { Spinner2 } from "./Spinner2"

interface Props {
  click: any
  text: any
  config?: string
  loading?: Boolean
}

export const ButtonAI: React.FC<Props> = ({ click, text, config, loading }) => {
  return (
    <button onClick={click} className={`${config} ${loading ? 'cursor-not-allowed' : ''} text-sm relative inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md overflow-hidden group`}>
      <span className={`${loading ? '' : 'group-hover:w-full group-hover:h-full'} absolute w-0 h-0 transition-all duration-300 ease-out bg-white opacity-10`}></span>
      <span className="relative">{loading ? <Spinner2 /> : `✨ ${text}`}</span>
    </button>
  )
}