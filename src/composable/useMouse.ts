const useMouse = () => {
  const interact = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  const interactEnd = () => {}
  return { interact, interactEnd }
}
export default useMouse
