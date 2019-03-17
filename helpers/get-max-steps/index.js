const getMaxSteps = (steps, step) => {
  let nextStep
  if(!step.next || step.next.length === 0) {
    return 0
  }
  let maxStepArr = step.next.map(nextStepId => {
    nextStep = steps.find(s => s.id === nextStepId.id)

    if(nextStep === undefined) {
      return 1
    } else {
      return getMaxSteps(steps, nextStep) + 1
    }
  })

  return Math.max(...maxStepArr)
}

export default getMaxSteps