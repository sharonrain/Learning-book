
# JSON web tokens
## 1.Link
[JSON web tokens](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)   
## 2.关于跨域认证
### 2.1 一般流程
1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个 session_id，写入用户的 Cookie。
4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。
### 2.2 问题
服务器集群 or 跨域的服务导向架构, 要求 session 数据共享

### 2.3 解决方案
1. session 数据持久化，写入数据库或别的持久层
2. 服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。（JWT）
## 3.JWT
### 3.1 原理
- 是一个很长的字符串，中间用点（.）分隔成三个部分
- Header.Payload.Signature

### 3.2数据结构
#### 3.2.1 Header
- alg属性表示签名的算法
- typ属性表示这个令牌（token）的类型（type）
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 3.2.2 Payload
1. 7个官方字段
    - iss (issuer)：签发人
    - exp (expiration time)：过期时间
    - sub (subject)：主题
    - aud (audience)：受众
    - nbf (Not Before)：生效时间
    - iat (Issued At)：签发时间
    - jti (JWT ID)：编号

2. 可以在这个部分定义私有字段
3. JWT 默认是不加密的，任何人都可以读到

#### 3.2.3 Signature
1. Signature 部分是对前两部分的签名，防止数据篡改。
## 4.JWT 的使用
- 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。
- 放在 Cookie 里面不能跨域
    - 方法1： 放在 HTTP 请求的头信息Authorization字段里面。（更好）
    - 方法2： 跨域的时候，JWT 就放在 POST 请求的数据体里面。
## 5.JWT 的几个特点
- JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。不加密的情况下，不能将秘密数据写入 JWT。
- JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。
- JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
- JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
- 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。