// bonus 1
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface Todo1 {
    title: string
    description: string
    completed: boolean
  }
  
type TodoPreview = MyPick<Todo1, 'title' | 'completed'>
  
const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
// bonus 2
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
}
  
  type Todo2 = DeepReadonly<X> // 和`Expected`类型相同