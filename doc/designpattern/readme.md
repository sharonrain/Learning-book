# 展开例子的上下文
  有一个用户， 一个飞机场，飞机场里面包含各式各样的飞机，每个飞机又可以完成各种功能（运货，轰炸...）  
  
# 工厂模式
## 意图
  用于根据用户传过来的名字，创建相应的对象，并返回给用户
## 何时使用
  我们明确地计划不同条件下创建不同实例时
## 优点
  1、一个调用者想创建一个对象，只要知道其名称就可以了。  
  2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。
## 缺点
  每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。
## 具体讲解博客
  http://www.runoob.com/design-pattern/factory-pattern.html
## 例子的要求
  假设每种类型的飞机有个名字，用户希望通过名字就可以获取相应的飞机对象
## 例子的C++实现
### 接口类的定义
>  用来抽象各种类型的飞机，可以保持对用户的接口统一  
> class AirPlane {  
> public:  
> &nbsp;&nbsp;void RunTask();  
> private:  
>   ...  
> };  

### 具体类的定义
> 用来实现各种具体类型飞机，及其功能    
> class BomberPlane {  
> public:  
> &nbsp;&nbsp;void RunTask() {  
> &nbsp;&nbsp;&nbsp;&nbsp;cout << "Bang!!!";  
> &nbsp;&nbsp;}  
> private:  
> &nbsp;&nbsp;...  
> };  
>    
> class TransportPlane {  
> public:  
> &nbsp;&nbsp;void RunTask() {  
> &nbsp;&nbsp;&nbsp;&nbsp;cout << "Transition!!!";  
> &nbsp;&nbsp;}  
> private:  
> &nbsp;&nbsp;...  
> };  
  
### 工厂类的定义!!!  
> 对用户的接口，用于产生并返回飞机对象  
> class AirPort {  
> public:  
> &nbsp;&nbsp;AirPlane* getPlane(const string& name) {  
> &nbsp;&nbsp;&nbsp;&nbsp;if (name == "Bomber") {  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return new BomberPlane();  
> &nbsp;&nbsp;&nbsp;&nbsp;} else if (name == "Transition")
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return new TransportPlane();  
> &nbsp;&nbsp;&nbsp;&nbsp;} else {  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return NULL;  
> &nbsp;&nbsp;&nbsp;&nbsp;}  
> &nbsp;&nbsp;}  
> };  
 
### 用户怎么用  
> 对用户的接口，用于产生并返回飞机对象  
> int main() {  
> &nbsp;&nbsp;AirPort* air_port = new AirPort();  
> &nbsp;&nbsp;AirPlane* p = air_port->GetPlane("Bomber");  
> &nbsp;&nbsp;p->RunTask();  
> &nbsp;&nbsp;AirPlane* p2= air_port->GetPlane("Transition");  
> &nbsp;&nbsp;p2->RunTask();  
> };  
  
## 工厂类的问题思考
  1. 如果对象构造函数需要参数，怎么办？ 
  2. 如果RunTask带参数怎么办？
  3. 用if else判断名称到对象的映射是不是太hard code
