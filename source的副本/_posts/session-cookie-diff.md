---
title: Session和Cookie的不同
author: Von
date: 2020-02-27 13:38:44
subtitle:
tags:
    web
---

Session
1. Session can store any type of data because the value is of data type of “object”
2. These are stored at server side.
3. Sessions are secured because it is stored in binary format/encrypted form and gets decrypted at server.
4. Session is independent for every client i.e. individual for every client.
5. There is no limitation on the size or number of sessions to be used in an application.
6. We cannot disable the sessions. Sessions can be used without cookies also.
7. The disadvantage of session is that it is a burden or an overhead on server.
8. Sessions are called as Non-Persistent cookies because its life time can be set manually
Cookies
1. Cookies can store only “string” datatype.
2. They are stored at client side.
3. Cookie is non-secure since stored in text-format at client side.
4. Cookies may or may not be individual for every client.
5. Size of cookie is limited to 40 and number of cookies to be used is restricted to 20.
6. Cookies can be disabled.
7. Since the value is in string format there is no security.
8.We have persistent and non-persistent cookies.
