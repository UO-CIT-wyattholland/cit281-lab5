const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

const fastify = require("fastify")();
// Get route and JSON/object reply
fastify.get("/cit/student", (request, reply) => {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
    const { id } = request.params;
    let student = null;
    for (const item of students) {
        if (item.id === parseInt(id)) {
            student = item;
            break;
        }
    }

    if (student) {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(student);
    } else {
        if (!student) {
            reply
                .code(404)
                .header("Content-Type", "text/html; charset=utf-8")
                .send("Not found");
        }
    }
});

fastify.get("/cit/*", (request, reply) => {
    reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(unmatched);
});

fastify.post("/cit/student", (request, reply) => {
    const { last, first } = request.body;
    const id = null;

if (!last || !first) {
    reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Not found");
    } else {
        let id = 0;
        for (const student of students) {
            if(student.id > id) {
                id = student.id;
            }
        }
        id++;
        students.push({ id, last, first });

        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send(students[students.length - 1]);
    }
    let response = request.body;
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(response);
});

const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
        }
    console.log(`Server listening on ${address}`);
});