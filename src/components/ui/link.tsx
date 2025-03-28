import { Fragment, Ref, VNode, h, options } from 'preact'

declare module 'preact' {
  interface Options {
    __b: (node: VNode) => void
  }
}

const oldDiff = options.__b
options.__b = (vnode: VNode) => {
  if (vnode.type === Link && 'ref' in vnode) {
    // @ts-expect-error force augment the value
    vnode.props.ref = vnode.ref
    vnode.ref = null
  }

  if (oldDiff) oldDiff(vnode)
}

export const Link = ({ ref, ...props }) => {
  return <a ref={ref} {...props} />
}
