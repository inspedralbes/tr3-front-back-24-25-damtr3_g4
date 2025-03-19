import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import xmlrpc from 'xmlrpc';

const app = express();
dotenv.config();

const port = process.env.PORT || 4001;
app.use(express.json());
app.use(cors({
    origin: '*',
}));

const url = process.env.ODOO_URL;
const db = process.env.ODOO_DB;
const username = process.env.ODOO_USERNAME;
const password = process.env.ODOO_PASSWORD;

const common = xmlrpc.createClient({ url: `${url}/xmlrpc/2/common` }); //Autenticación y obtener información sobre la base de datos.
const object = xmlrpc.createClient({ url: `${url}/xmlrpc/2/object` }); //Realizar operaciones CRUD en los modelos de la base de datos.

const authenticate = () =>
    new Promise((resolve, reject) => {
        common.methodCall("authenticate", [db, username, password, {}], (err, uid) => {
            if (err) reject(err);
            else resolve(uid);
        });
    });

app.post("/createClient", async (req, res) => {
    try {
        const uid = await authenticate();
        const { username, email } = req.body;

        object.methodCall("execute_kw", [db, uid, password, "res.partner", "create", [{ username, email, customer_rank: 1 }]], (err, value) => {
            if (err) {
                console.error("Error al crear el cliente:", err);
                res.status(500).json({ error: "Error al crear el cliente" });
            } else {
                res.status(200).json({ message: "Cliente creado correctamente", id: value });
            }
        });

    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({ error: "Error al crear el cliente" });

    }
});

app.get("/getClients", async (req, res) => {
    try {
        const uid = await authenticate();

        object.methodCall("execute_kw", [db, uid, password, "res.partner", "search_read", [[], ['id', 'username', 'email']]], (err, value) => {
            if (err) {
                console.error("Error al obtener los clientes:", err);
                res.status(500).json({ error: "Error al obtener los clientes" });
            } else {
                res.status(200).json(value);
            }
        });

    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({ error: "Error al obtener los clientes" });

    }
});

app.get("/getClient/:id", async (req, res) => {
    try {
        const uid = await authenticate();
        const id = parseInt(req.params.id);

        object.methodCall("execute_kw", [db, uid, password, "res.partner", "search_read", [[["id", "=", id]], ['id', 'username', 'email']]], (err, value) => {
            if (err) {
                console.error("Error al obtener el cliente:", err);
                res.status(500).json({ error: "Error al obtener el cliente" });
            } else {
                res.status(200).json(value);
            }
        });

    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).json({ error: "Error al obtener el cliente" });

    }
});

//Crear producte

app.post("/createProduct", async (req, res) => {
    try {
        const uid = await authenticate();
        const { name, description, img, price } = req.body;

        object.methodCall("execute_kw", [db, uid, password, "product.product", "create", [{ name, description, img, price }]], (err, value) => {
            if (err) {
                console.error("Error al crear el producto:", err);
                res.status(500).json({ error: "Error al crear el producto" });
            } else {
                res.status(200).json({ message: "Producto creado correctamente", id: value });
            }
        });

    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }

});

app.get("/getProducts ", async (req, res) => {
    try {
        const uid = await authenticate();

        object.methodCall("execute_kw", [db, uid, password, "product.product", "search_read", [[], ['id', 'name', 'description', 'img', 'price']]], (err, value) => {
            if (err) {
                console.error("Error al obtener los productos:", err);
                res.status(500).json({ error: "Error al obtener los productos" });
            } else {
                res.status(200).json(value);
            }
        });

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });

    }
});

app.get("/getProduct/:id", async (req, res) => {
    try {
        const uid = await authenticate();
        const id = parseInt(req.params.id);

        object.methodCall("execute_kw", [db, uid, password, "product.product", "search_read", [[["id", "=", id]], ['id', 'name', 'description', 'img', 'price']], 0, 1], (err, value) => {
            if (err) {
                console.error("Error al obtener el producto:", err);
                res.status(500).json({ error: "Error al obtener el producto" });
            } else {
                res.status(200).json(value);
            }
        });

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });

    }
});

app.post("/createSaleOrder", async (req, res) => {
    try {
        const uid = await authenticate();
        const { partner_id, product_id, quantity, price } = req.body;

        const params = {
            partner_id,
            order_line: [[0, 0, { product_id, product_uom_qty: quantity, price_unit: price }]]
        };

        object.methodCall(
            "execute_kw",
            [db, uid, password, "sale.order", "create", [params]],
            (err, orderId) => {
                if (err) return res.status(500).json({ error: "Error al crear la orden de venta" });
                res.json({ orderId });
            }
        )

    } catch (error) {
        console.error("Error al crear la orden de venta:", error);
        res.status(500).json({ error: "Error al crear la orden de venta" });

    }
});

app.get("/getSaleOrders", async (req, res) => {
    try {
        const uid = await authenticate();

        object.methodCall("execute_kw", [db, uid, password, "sale.order", "search_read", [[], ['id', 'partner_id', 'amount_total']], 0, 10], (err, orders) => {
            if (err) return res.status(500).json({ error: err })
            res.json(orders);
        });

    } catch (error) {
        console.error("Error al obtener las ordenes de venta:", error);
        res.status(500).json({ error: "Error al obtener las ordenes de venta" });

    }
});

app.get("/getSaleOrder/:id", async (req, res) => {
    try {
        const uid = await authenticate();
        const orderId = parseInt(req.params.id);

        object.methodCall(
            "execute_kw",
            [db, uid, password, "sale.order", "read", [[orderId], ["id", "name", "partner_id", "amount_total"]]],
            (err, order) => {
                if (err) return res.status(500).json({ error: err });
                res.json(order);
            }
        )
    } catch (error) {

    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
