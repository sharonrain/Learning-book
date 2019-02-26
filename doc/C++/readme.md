# C++使用技巧

## 使用c++实现反射机制，仅仅通过类名字符串就能获得该类的实例
### 实现的思路
> 我们需要使用某种机制记录这种字符串保存的类名和类实例获取方法（函数）的映射关系。 我们首先想到的就是用一个std::map数据结构去存取这种映射关系。 这个map 存贮在一个工厂类中（这里和工厂模式有些不同，但大体上是用来直接获取实例的途径。和工厂类类似，因此采用工厂类这个叫法，后面不再重述）， 工厂类提供注册映射关系和通过得到实例的方法。 再者如果每次新增一个类， 都需要先在工厂类中完成注册才能使用。那在应用代码中加这些注册的代码，一来会使得耦合变强，二来每次手动注册加重了应用层的工作量。 因此可以巧妙的设计一个宏来帮我们完成这块。这样再每次设计完一个需要实例化的类后，可以立刻调用宏注册， 而在应用层面的代码中手动注册，让代码便于维护。  
> 宏定义的一些符号

### 代码样例
  // 工厂类头文件 object_factory.h
  #ifndef _OBJECT_FACTORY_H
  #defINE _OBJECT_FACTORY_H
  #include <functional>
  #include <unordered_map>
  #include <string>
  // 定义每个工厂类的instance函数,返回对象的无参数的函数
  typedef std::function<void *()> GetObjectFunction;
  // 定义映射表，用于存储名字到函数的映射，从而可以通过名字找到函数，然后通过函数生成对象
  class ObjectFactory {
    public:
      static std::unordered_map<std::string, GetObjectFunction>& Registery() {
        static std::unordered_map<std::string, GetObjectFunction> ins;
        return ins;
      }
  }
  
  // 定义注册类
  class OjectRegister {
    public:
      OjectRegister(const std::string name, GetObjectFunction&& func) {
        auto& map = ObjectFactory.Registery();
        auto& val = map\[str\];
        if (!val) {
          cout << name << " has not been registered";
        }
        val = std::move(func);
      }
  }
  #define REGISTER_OBJECT_FUNC(name, func) static OjectRegister __register__##name (#name, func)
  #endif
  
    
  
