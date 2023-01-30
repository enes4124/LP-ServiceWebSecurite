const express = require("express");
const app = express();
const port = 3000;

const ldap = require("ldapjs");

const client = ldap.createClient({
  url: "ldap://docky.netlor.fr:3722",
});

app.get("/person/:person", (req, res) => {
  client.bind("cn=admin,dc=groupe2,dc=com", "azertyuiop", function (err) {
    if (err) {
      return console.error("err:", err);
    }

    const opts = {
      cn: req.params.person,
      objectclass: "person",
    };

    client.search(
      `cn=${req.params.person},dc=groupe2,dc=com`,
      opts,
      function (err, response) {
        response.on("searchEntry", function (entry) {
          res.send(entry.object);
        });
        response.on("error", function (err) {
          res.send({
            error: err.message,
          });
        });
        response.on("end", function (result) {
          console.log("status: " + result.status);
        });
      }
    );
  });
});

app.get("/list", (req, res) => {
    client.bind("cn=admin,dc=groupe2,dc=com", "azertyuiop", function (err) {
        if (err) {
            return console.error("err:", err);
        }

        const opts = {
            objectclass: "person",
        };

        client.search("dc=groupe2,dc=com", opts, function (err, response) {
            response.on("searchEntry", function (entry) {
                res.send(entry.object);
            });
            response.on("error", function (err) {
                res.send({
                    error: err.message,
                });
            });
            response.on("end", function (result) {
                console.log("status: " + result.status);
            });
        });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
