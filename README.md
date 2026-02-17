1) What is the difference between null and undefined?
 ans: undefined মানে ভ্যারিয়েবল declare করা আছে কিন্তু কোনো value assign করা হয়নি।
      null মানে ইচ্ছা করে empty বা কিছু নেই সেট করা হয়েছে।
      undefined automatically আসে, null developer নিজে দেয়।
      দুটাই falsy কিন্তু meaning আলাদা।
2) What is the use of the map() function in JavaScript? How is it different from forEach()?
   ans: map() array এর প্রতিটি element থেকে নতুন array return করে।
       এটা use হয় data transform করতে।
       forEach() শুধু loop চালায়, নতুন array return করে না।
       map return করে, forEach return করে না।
3) What is the difference between == and ===?
   ans : == শুধু value compare করে, type convert করে নিতে পারে।
         === value + type দুটোই compare করে।
        5 == "5" true হয়।
        5 === "5" false হয়।
4) What is the significance of async/await in fetching API data?
   ans: API fetch করার সময় async/await asynchronous code সহজ করে।
        Promise handle করা clean হয়।
        code synchronous এর মতো পড়ে।
        error handle করা সহজ হয় try/catch দিয়ে।
5) Explain the concept of Scope in JavaScript (Global, Function, Block).
   ans : Scope মানে ভ্যারিয়েবল কোথায় access করা যাবে।
         Global scope সব জায়গা থেকে access করা যায়।
         Function scope শুধু function এর ভিতরে।
         Block scope (let/const) শুধু {} এর ভিতরে কাজ করে।
