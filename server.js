const express = require("express");
const app = express();
const port = 3000;

const ldap = require("ldapjs");

const client = ldap.createClient({
  url: "ldap://docky.netlor.fr:3722",
});

client.bind("cn=admin,dc=groupe2,dc=com", "azertyuiop", function (err) {
  if (err) {
    return console.error("err:", err);
  }

  console.log("bind success");

  //   const opts = {
  //     filter: "(cn=hilel)",
  //     scope: "sub",
  //     attributes: ["dn", "cn", "sn", "mail"],
  //   };

  const opts = {
    cn: "hilel",
    objectclass: "person",
  };

  client.search("cn=hilel,dc=groupe2,dc=com", opts, function (err, res) {
    res.on("searchEntry", function (entry) {
      console.log("entry: " + JSON.stringify(entry.object));
    });
    res.on("error", function (err) {
      console.error("error: " + err.message);
    });
    res.on("end", function (result) {
      console.log("status: " + result.status);
    });
  });
});

// client.unbind(function (err) {
//     if (err) {
//         return console.error("err:", err);
//     }
//     console.log("unbind success");
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
