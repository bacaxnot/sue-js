<!-- Project introduction -->
# **Dro-ex**
This is the client side of a basic web API made for testing new technologies. The web app consumes a [REST API](https://github.com/cala-js/coex-test-api) to get the necessary data to render content.

<!-- Component API introduction -->
## Components API
---
Instead of using an existing Front-end Framework or Library, I tried to create a basic API for parsing dynamic HTML templates. It works through **Component** objects instantiation. To create a new instance of a **Component** you must define an object literal using the [`IComponentOptions`](#ComponentOptions) interface, and pass it to the **Component** constructor. There's an [example implementation](#example-implementation) as a reference a few lines down.

<!-- Options Interface explanation -->
## ComponentOptions
---
```typescript
interface IComponentOptions {
    name: string,
    template: string,
    components?: Component[],
    props?: string[],
    vars?(self:Component): IComponentVars,
    listeners?: IEventRegister[],
}
```
<!-- Attributes explanation -->
### Attributes explanation:
- ***name***: a string that will be used to instanciate the component inside HTML files in a *WebComponent* style.
- ***template***: an HTML string that will be used as template for the **Component** instance.
- ***components***: an array used to declare the **Component** objects that will be used inside the template string.
- ***props***: an array listing the props that the **Component** can receive through HTML attributes (much like Vue's props). Its values can be accessed inside the **template** string by using double handlebars. For example, if `props:[example]` is declared, can be accesed like `<div>{{example}}</div>`.
- ***vars***: a function that allows to access the **Component** instance through the **self** param and returns an object with the desired data. Similar to **props** values, can be accesed using double handlebars. The difference is that, with **vars**, you have to use the `this` prefix like `<div>{{this.example}}</div>`.
- ***listeners***: an array of objects that implement the `IEventRegister` interface to assign EventListeners to the HTML Elements inside the **Component template**. Just like the **vars** attribute, the **listeners** objects can access the **Component** instance through the **self** variable.

<!-- Example -->
## Example Implementation
---
<!-- Example - Child Component -->
Ideally, you'll have your HTML template in a separate HTML file. We'll start with a simple reusable button **Component** that we'll instantiate later inside another parent **Component**. So, we have the `circularButton.html` file:

```html
<button class="circular-btn">{{mssg}}</button>
```

Which is imported inside its corresponding configuration file, `circularButton.ts`:

```typescript
import template from './circularButton.html?raw'
import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'

const options: IComponentOptions = {
    name: 'circularButton',
    template: template,
    props: ['mssg'],
    listeners: [
        {
            targetQuery: '',
            event: 'click',
            callback(self) {
                console.log(self.content)
                console.log('This component works!')
            },
        },
    ],
}

export const CircularButton = new Component(options)

```

<!-- Example - Listeners API explanation -->
As you can see, the **options** object has a `mssg` **prop** which is being used inside the HTML template file. It has also an EventListener declared inside the **listeners** array. The `IEventRegister` interface receives a `targetQuery`, which is an empty string in this case. When `targetQuery` is empty, it references the whole component. You can also attach EventListeners to children elements of the **Component** using `Element.querySelector()` syntax inside `targetQuery` (we'll see later).
\
\
There's also a `callback()` attribute that uses `self` as parameter, which, as previously mentioned, references the component instance. The `callback()` will be executed whenever the declared `event` is detected. In this case, when you click the component, the console will throw:

```html
<button class="circular-btn" >{{mssg}}</button>
This component works!
```

<!-- Example - Parent Component -->
However, this is a reusable component. It will be used inside another custom parent **Component**, transfering all the previously declared Listeners and logic to all of its instances. To exemplify this, we have the `home.html` file:

```html
<main class="home">
    {{this.mssg}} {{this.otherMssg}}
    <circularButton
        class="example"
        e-for="mssg in this.mssgs"
        mssg="mssg"
    ></circularButton>
    <circularButton 
        class="example2"
        mssg="Click me 2!"
    ></circularButton>
    <div
        class="something" 
        e-for="mssg in this.mssgs">
        This is the message: {mssg}
    </div>
</main>
```

<!-- Example - 'e-for' sentence and nested components explanation -->
Which is creating circularButton ***Component*** instances and passing the ***mssg*** value as an HTML attribute.
Also, as you may have noticed, the first `circularButton` and the `div` elements are using an `e-for` attribute. This sentence works as a `forEach()` method: it iterates over a `props` or `vars` value specified after the `in` sentence inside the value of the attribute. Following the same logic previously mentioned in the [attributes explanation](#attributes-explanation), you can access `vars` values with the `this` prefix, and `props` values without it.
\
\
The **component** configuration is declared inside the folllowing file:

```typescript
import { Component } from '../../entities/classes/Component'
import { IComponentOptions } from '../../entities/interfaces/iComponentOptions'
import template from './home.html?raw'

import { CircularButton } from '../circularButton/circularButton'

const options: IComponentOptions = {
    name: 'HomeView',
    template: template,
    components: [CircularButton],
    props: ['class'],
    vars(self) {
        return {
            mssg: 'Hello',
            otherMssg: 'World',
            mssgs: ['ms1', 'ms2', 'ms3', 'ms4'],
        }
    },
    listeners: [
        {
            targetQuery: '.example2',
            event: 'click',
            callback(self) {
                console.log('Another eventhandler')
                console.log(self)
            },
        },
    ],
}

export const HomeView = new Component(options)
```

<!-- Example - Output -->
The rendered component in the DOM would look like this:
```html
<main class="home">
    Hello World
    <button class="circular-btn example">
        ms1
    </button>
    <button class="circular-btn example">
        ms2
    </button>
    <button class="circular-btn example">
        ms3
    </button>
    <button class="circular-btn example">
        ms4
    </button>
    <button class="circular-btn example2">
        Click me 2!
    </button>
    <div class="something" e-for="mssg in this.mssgs">
        This is the message: ms1
    </div>
    <div class="something" e-for="mssg in this.mssgs">
        This is the message: ms2
    </div>
    <div class="something" e-for="mssg in this.mssgs">
        This is the message: ms3
    </div>
    <div class="something" e-for="mssg in this.mssgs">
        This is the message: ms4
    </div>
</main>
```
<!-- Example - Multiple listeners assignation -->

There's also another eventhandler that's being assigned to the elements with the `example2` class. In this case, as the element with that class is also a `circularButton` ***component***, it'll have two `click` handlers. So, when you click it, the console will throw:

```html
<button class="circular-btn example2">Click me 2!</button>
This component works!
Another eventhandler
Component {element: ComponentElement, propsState: {…}, options: {…}}
```
<!-- End message-->
That's the basic explanation of the Component API. Everything else in the project is just plain HTML, CSS and JS (TS).