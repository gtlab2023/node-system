# Next笔记系统
## next使用技巧
### 客户端下移
客户端组件下移，可以让某些依赖包不会打包进去

### 使用Suspense
服务端组件在异步请求的时候，数据加载都在服务端，就会导致客户端请求页面的接口被卡住

### RSC Payload(React Server Components Payload)
这是react定义的一种特殊格式，包括
1. 服务端组件的渲染结果
2. 客户端组件的占位位置和引用文件
3. 从服务端组件传给客户端组件的数据

使用这种格式的优势在于它针对流做了优化，数据是分行的，它们可以以流的形式逐行从服务端发送给客户端，客户端可以逐行解析 RSC Payload，渐进式渲染页面

#### SSR（传统的 SSR，想想 Pages Router 下的 SSR 实现） 和 RSC 的区别：

1. RSC 的代码不会发送到客户端，但传统 SSR 所有组件的代码都会被发送到客户端
2. RSC 可以在组件树中任意位置获取后端，传统 SSR 只能在顶层（getServerSideProps）访问后端
3. 服务器组件可以重新获取，而不会丢失其树内的客户端状态

### 路由缓存
Next.js 提供的客户端路由缓存功能，客户端会缓存 RSC Payload 数据
- Session，缓存在导航期间会持续存在，当页面刷新的时候会被清除
- 自动失效期：单个路由段会在特定时长后自动失效，如果路由是静态渲染，持续 5 分钟，如果是动态渲染，持续 30s

详细的缓存内容可以参考[缓存篇](https://juejin.cn/book/7307859898316881957/section/7309077169735958565#heading-20)

### 服务端组件和客户端组件
所有组件都是服务器组件，除非它使用了 'use client' 指令，或者被导入到 'use client' 模块中。此时它们会被视为客户端组件。视为客户端组件，就意味着它的代码要被打包到客户端 bundle 中。

### Server Actions
发生在服务端的异步函数调用，不用通过接口了
## 踩坑
### [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)初次接触
```js
 <form className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={pending}
            type="submit"
            role="menuitem"
            formAction={() => saveNote(noteId, title, body)}
          >
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            完成
          </button>
</form>
```
不理解formAction的写法，切换成onClick后接口会调用但是`redirect`不会生效.formAction在button上可以替换form的acction属性