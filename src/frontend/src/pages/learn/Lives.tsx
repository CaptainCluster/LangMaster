const Lives = ({ lives }: { lives: number }) => {

  return (
    <div className="border-b border-gray-400 pb-3">      
      {`Lives remaining: ${lives}`} 
    </div>
  )
}

export default Lives;
