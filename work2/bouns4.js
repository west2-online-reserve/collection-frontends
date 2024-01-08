function createElement(tag, attrs, children) {
  return {
    tag,
    attrs,
    children
  };
}
  
function mount(vdom, container) {
  const { tag, attrs, children } = vdom;
  const element = document.createElement(tag);
  
  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        mount(child, element);
      }
      });
    }
    container.appendChild(element);
  }
  
// 虚拟dom
const vdom = createElement('div', { id: 'container' }, [
  createElement('ul', { id: 'list' }, [
    createElement('li', { className: 'item' }, ['Item 1']),
    createElement('li', { className: 'item' }, ['Item 2']),
    createElement('li', { className: 'item' }, ['Item 3'])
  ])
]);
  
// 挂载虚拟dom
mount(vdom, document.body);
