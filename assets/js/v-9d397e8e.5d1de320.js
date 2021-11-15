"use strict";(self.webpackChunkFreeSql_Wiki_VuePress=self.webpackChunkFreeSql_Wiki_VuePress||[]).push([[191],{4971:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-9d397e8e",path:"/guide/BaseEntity.html",title:"前言",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"guide/BaseEntity.md",git:{updatedTime:1636941204e3,contributors:[{name:"IGeekFan",email:"luoyunchong@foxmail.com",commits:1}]}}},8473:(n,s,a)=>{a.r(s),a.d(s,{default:()=>k});var p=a(6252);const t=(0,p.uE)('<h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1><p>尝试过 ado.net、dapper、ef，以及Repository仓储，甚至自己还写过生成器工具，以便做常规CRUD操作。</p><p>它们日常操作不方便之处：</p><ul><li><p>每次使用前需要声明，再操作；</p></li><li><p>很多人一个实体类，对应一个操作类（或DAL、DbContext、Repository）；</p></li></ul><p>本文介绍 BaseEntity 一种极简约的 CRUD 操作方法。</p><h1 id="功能特点" tabindex="-1"><a class="header-anchor" href="#功能特点" aria-hidden="true">#</a> 功能特点</h1><ul><li><p>自动迁移实体结构（CodeFirst），到数据库；</p></li><li><p>直接操作实体的方法，进行 CRUD 操作；</p></li><li><p>简化用户定义实体类型，省去主键、常用字段的配置（如CreateTime、UpdateTime）；</p></li><li><p>实现单表、多表查询的软删除逻辑；</p></li></ul><h1 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h1><p>参考 BaseEntity.cs 源码（约100行），copy 到项目中使用，然后添加 nuget 引用包：</p><blockquote><p>dotnet add package FreeSql.Repository</p></blockquote><blockquote><p>dotnet add package FreeSql.Provider.Sqlite</p></blockquote><p>1、定义一个主键 int 并且自增的实体类型，BaseEntity TKey 指定为 int/long 时，会认为主键是自增；</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserGroup</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseEntity<span class="token punctuation">&lt;</span>UserGroup<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> GroupName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果不想主键是自增键，可以重写属性：</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserGroup</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseEntity<span class="token punctuation">&lt;</span>UserGroup<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span>\n    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Column</span><span class="token attribute-arguments"><span class="token punctuation">(</span>IsIdentity <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span> \n    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> GroupName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',15),e=(0,p.Uk)("有关更多实体的特性配置，可参阅 "),c=(0,p.Uk)("实体属性"),o=(0,p.uE)('<p>2、定义一个主键 Guid 的实体类型，保存数据时会自动产生有序不重复的 Guid 值（不用自己指定 Guid.NewGuid()）；</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseEntity<span class="token punctuation">&lt;</span>UserGroup<span class="token punctuation">,</span> Guid<span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> UserName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>3、定义多主键的实体类型，可以在 static 构造函数中重写字段名；</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseEntity<span class="token punctuation">&lt;</span>User2<span class="token punctuation">,</span> Guid<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token function">User2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        User2<span class="token punctuation">.</span>Orm<span class="token punctuation">.</span>CodeFirst<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConfigEntity</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User2<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>t <span class="token operator">=&gt;</span>\n        <span class="token punctuation">{</span>\n            t<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span>a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>PkId1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token string">&quot;UserId&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            t<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span>a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>PkId2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token string">&quot;Index&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Username <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h1 id="crud-使用" tabindex="-1"><a class="header-anchor" href="#crud-使用" aria-hidden="true">#</a> CRUD 使用</h1><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token comment">//添加</span>\n<span class="token class-name"><span class="token keyword">var</span></span> item <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserGroup</span> <span class="token punctuation">{</span> GroupName <span class="token operator">=</span> <span class="token string">&quot;组一&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\nitem<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//更新</span>\nitem<span class="token punctuation">.</span>GroupName <span class="token operator">=</span> <span class="token string">&quot;组二&quot;</span><span class="token punctuation">;</span>\nitem<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//添加或更新</span>\nitem<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//软删除</span>\nitem<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//恢复软删除</span>\nitem<span class="token punctuation">.</span><span class="token function">Restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//根据主键获取对象</span>\n<span class="token class-name"><span class="token keyword">var</span></span> item <span class="token operator">=</span> UserGroup<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">//查询数据</span>\n<span class="token class-name"><span class="token keyword">var</span></span> items <span class="token operator">=</span> UserGroup<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Id <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>实体类型.Select 是一个查询对象，使用方法和 FreeSql.ISelect 一样；</p><p>支持多表查询时，软删除条件会附加在每个表中；</p>',8),l=(0,p.Uk)("有关更多查询方法，可参阅 "),u=(0,p.Uk)("查询"),i=(0,p._)("p",null,"示范项目：https://github.com/2881099/FreeSql/tree/master/Examples/base_entity",-1),r={},k=(0,a(3744).Z)(r,[["render",function(n,s){const a=(0,p.up)("RouterLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[t,(0,p._)("blockquote",null,[(0,p._)("p",null,[e,(0,p.Wm)(a,{to:"/guide/entity-attribute.html"},{default:(0,p.w5)((()=>[c])),_:1})])]),o,(0,p._)("blockquote",null,[(0,p._)("p",null,[l,(0,p.Wm)(a,{to:"/guide/select.html"},{default:(0,p.w5)((()=>[u])),_:1})])]),i],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);