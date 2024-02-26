const CompletedTask = ({ task }) => {
  return (
    <>
      <div className="flex items-center justify-center space-x-1 mb-5">
        <div className="flex-1 text-center">{task.name}</div>
        <div className="w-60 text-center">{task.dd + '/' + task.mm + '/' + task.yy + '  ' + task.hr + ':' + task.min + ':' + task.sec}</div>
        <div className="w-60 text-center">Pending Implementation</div>
      </div>
    </>
  )
}

export default CompletedTask