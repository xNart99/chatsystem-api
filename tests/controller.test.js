const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const config = require("../config");
const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyIiwiaWF0IjoxNjY1MzkyNjYyfQ.4rvT6xWc1mvNHuXxgbQmZzW5XdQedeAXLJz75QLsXZo";

beforeEach( async() => {
    await mongoose.connect(config.DB.URL, config.DB.CONFIG);
});
  
afterEach(async () => {
    await mongoose.connection.close();
});

//auth controller

describe("POST /api/auth/register", () => {
    it("should create a user", async () => {
        const res = await request(app).post("/api/auth/register").set("authorization", token).send({
            username: "test",
            password: "test",
            email: "test@gmail.com",
            role: "super"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/auth/login", () => {
    it("should login user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            username: "admin",
            password: "admin",
        })
        expect(res.statusCode).toBe(200);
    });
});

//user controller

describe("PUT /api/users/role", () => {
    it("should update role user", async () => {
        const res = await request(app).put("/api/users/role").set("authorization", token).send({
           username: "test",
           role: "member"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/users", () => {
    it("should get list user", async () => {
        const res = await request(app).get("/api/users").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});


describe("PUT /api/users/profile", () => {
    it("should update profile user", async () => {
        const res = await request(app).put("/api/users/profile").set("authorization", token).send({
          username: "test",
          email: "testnew@gamil.com"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/users/profile", () => {
    it("should get profile user", async () => {
        const res = await request(app).get("/api/users/profile").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/users", () => {
    it("should delete user", async () => {
        const res = await request(app).delete("/api/users").set("authorization", token).query({username: "test"})
        expect(res.statusCode).toBe(200);
    });
});

// groups controller

describe("POST /api/groups", () => {
    it("should create a group", async () => {
        const res = await request(app).post("/api/groups").set("authorization", token).send({
            createdAt: 1664100699949,
            id: "d5cd4135-0f5e-46b6-9b8f-b077b417c7fc",
            name: "tets 11",
            updatedAt: 1664100699949
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/groups/:id", () => {
    it("should get detail group", async () => {
        const res = await request(app).get("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /api/groups", () => {
    it("should update group", async () => {
        const res = await request(app).put("/api/groups").set("authorization", token).send({
            createdAt: 1664100699949,
            id: "d5cd4135-0f5e-46b6-9b8f-b077b417c7fc",
            name: "tets 11",
            updatedAt: 1664100699949
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/add-member", () => {
    it("should add user to group", async () => {
        const res = await request(app).post("/api/groups/add-member").set("authorization", token).send({
            groupId: "3b8c3c16-39bc-4944-b0dc-9970197920c6",
            memberUsername: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/remove-member", () => {
    it("should remove user to group", async () => {
        const res = await request(app).post("/api/groups/remove-member").set("authorization", token).send({
            groupId: "3b8c3c16-39bc-4944-b0dc-9970197920c6",
            memberUsername: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/groups", () => {
    it("should get all group", async () => {
        const res = await request(app).get("/api/groups").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/groups/:groupId", () => {
    it("should delete user", async () => {
        const res = await request(app).delete("/api/users/3b8c3c16-39bc-4944-b0dc-9970197920c6").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/delete-user", () => {
    it("should delete user in all group", async () => {
        const res = await request(app).post("/api/groups/remove-member").set("authorization", token).send({
            memberUsername: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/:groupId/channels", () => {
    it("should create channel to group", async () => {
        const res = await request(app).post("/api/groups/d5cd4135-0f5e-46b6-9b8f-b077b417c7fc/channels").set("authorization", token).send({
            name: "test",
            createdAt: 13232323232,
            updatedAt: 12121212121,
            messages: [], 
            read: [],
            accessingUsers: []
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/:groupId/channels/:channelId/add-member", () => {
    it("should add user to channel", async () => {
        const res = await request(app).post("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0/channels/b27b3808-52a3-4d9a-bb99-378e0db5fcb2/add-member").set("authorization", token).send({
            username: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/:groupId/channels/:channelId/remove-member", () => {
    it("should remove user to channel", async () => {
        const res = await request(app).post("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0/channels/b27b3808-52a3-4d9a-bb99-378e0db5fcb2/remove-member").set("authorization", token).send({
            username: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});


describe("GET /api/groups/:groupId/channels/:channelId", () => {
    it("should get detail channel", async () => {
        const res = await request(app).get("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0/channels/b27b3808-52a3-4d9a-bb99-378e0db5fcb2").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/groups/:groupId/channels/:channelId", () => {
    it("should delete channel", async () => {
        const res = await request(app).delete("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0/channels/b27b3808-52a3-4d9a-bb99-378e0db5fcb2").set("authorization", token)
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/groups/:groupId/channels/:channelId/send-message", () => {
    it("should remove user to channel", async () => {
        const res = await request(app).post("/api/groups/2d2894c4-e994-40dc-8dba-6f38506274c0/channels/b27b3808-52a3-4d9a-bb99-378e0db5fcb2/send-message").set("authorization", token).send({
            createdAt: 11111,
            type: "text",
            content: "test",
            from: "user"
        })
        expect(res.statusCode).toBe(200);
    });
});