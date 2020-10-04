(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{557:function(t,e,r){"use strict";r.r(e);var n=r(11),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"共享事务"}},[t._v("共享事务")]),t._v(" "),r("p",[t._v("与前面全局事务所指的单个服务使用多个数据源正好相反，共享事务（Share Transactions）是指多个服务使用同一个数据源。请注意此语境里“数据源”与“数据库”的区别，我们在部署应用集群时一种典型模式是将同一套程序部署到多个中间件服务器的节点，它们连接了同一个数据库，但每个节点配有自己的专属的数据源JNDI，所有节点的数据访问都是完全独立的，并没有任何交集，此时每个节点所采用的是简单的本地事务。而本节讨论的是多个服务之间会产生业务交集的场景，举个具体例子，在Fenix‘s Bookstore的"),r("RouterLink",{attrs:{to:"/architect-perspective/general-architecture/transaction/"}},[t._v("场景事例")]),t._v("中，假设用户账户、商家账户和商品仓库都存储于同一个数据库之中，但用户、商户和仓库每个领域都部署了独立的微服务，此时一次购书的业务操作将贯穿三个微服务，它们都要在数据库中修改数据。如果我们直接将不同数据源就视为是不同数据库，那上一节所讲的全局事务和下一节要讲的分布式事务都是可行的，不过，针对这种每个数据源连接的都是同一个数据库的特例，共享事务则有机会成为另一条可能提高性能、降低复杂度的途径（但更有可能是个伪需求，为何拆了微服务还要连同一个数据库？）。")],1),t._v(" "),r("p",[t._v("一种"),r("strong",[t._v("理论可行")]),t._v("的方案是直接让各个服务共享数据库连接，同一个服务进程中的不同持久化工具（JDBC、ORM、JMS等）要共享数据库连接并不困难，一些应用服务器，如WebSphere中也会有“"),r("a",{attrs:{href:"https://www.ibm.com/support/knowledgecenter/zh/SSAW57_8.5.5/com.ibm.websphere.nd.multiplatform.doc/ae/cdat_conshrnon.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("可共享连接"),r("OutboundLink")],1),t._v("”的功能支持。但由于数据库连接的基础是网络连接，这是与IP地址绑定的，字面意义上的“不同服务节点能共享数据库连接”很难做到，所以这种方案里需要新增一个“交易服务器”的中间角色，无论是用户服务、商家服务还是仓库服务，它们都通过同一台交易服务器来与数据库打交道。如果你将交易服务器的对外接口实现为JDBC规范，那它完全可以视为是一个独立于各个服务的远程连接池或者数据库代理来看待，此时三个服务所发出的交易请求就有可能做到交由同一个数据库连接通过本地事务的方式完成。譬如，交易服务器根据不同服务节点传来的同一个事务ID，使用同一个数据库连接来处理跨越多个服务的交易事务。")]),t._v(" "),r("mermaid",{staticStyle:{margin:"-15px 0 -40px 0"}},[t._v('\ngraph LR\n\tUser("用户账户") --\x3e Proxy("交易服务器") \n\tBusiness("商家账户") --\x3e Proxy\n\tWarehouse("商品仓库") --\x3e Proxy\n\tProxy --\x3e Database("数据库 ")\n')]),t._v(" "),r("p",[t._v("之所以强调理论上，是因为这是与实际生产系统中的压力方向相悖的，一个集群中数据库往往才是压力最大而又最不容易伸缩拓展的重灾区，所以现实中只有类似"),r("a",{attrs:{href:"https://www.proxysql.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ProxySQL"),r("OutboundLink")],1),t._v("、"),r("a",{attrs:{href:"https://mariadb.com/kb/en/maxscale/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MaxScale"),r("OutboundLink")],1),t._v("这样用于对多个数据库实例做负载均衡的代理（其实用ProxySQL代理单个数据库，再启用Connection Multiplexing，其实已经挺接近于前面所提及的方案了），而几乎没有反过来代理一个数据库为多个应用提供事务协调的交易服务代理。这也是我说它更有可能是个伪需求的原因，连数据库都不拆分的话，你必须找到十分站得住脚的理由来向团队解释做微服务的价值是什么才行。")]),t._v(" "),r("p",[t._v("以上方案还有另外一种本质上是同样思路变种应用的形式：使用JMS服务器的来代替交易服务器，用户、商家、仓库的服务操作业务时，通过消息将所有对数据库的改动传送到JMS服务器，通过JMS来统一完成有事务保障的持久化操作。这被称作是“"),r("a",{attrs:{href:"https://www.javaworld.com/article/2077963/distributed-transactions-in-spring--with-and-without-xa.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("单个数据库的消息驱动更新"),r("OutboundLink")],1),t._v("”（Message-Driven Update of a Single Database）。“共享事务”的提法和这里所列的两种处理方式在实际应用中均不常见，鲜有采用这种方式的成功案例，笔者查询到的资料几乎都发源于十余年前的"),r("a",{attrs:{href:"https://www.javaworld.com/article/2077963/distributed-transactions-in-spring--with-and-without-xa.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("这篇文章"),r("OutboundLink")],1),t._v("，考虑到它并不契合于现在的技术趋势，这里也不花费更多的篇幅了。")])],1)}),[],!1,null,null,null);e.default=a.exports}}]);