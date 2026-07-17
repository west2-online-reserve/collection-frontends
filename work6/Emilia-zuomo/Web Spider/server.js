// server.js
const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('./fzu_notices.db', { readonly: true });

// 分页查询通知列表
app.get('/api/notices', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;
  const keyword = req.query.keyword || '';

  let whereClause = '';
  const params = [];
  if (keyword) {
    whereClause = 'WHERE title LIKE ? OR department LIKE ?';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  const total = db.prepare(`SELECT COUNT(*) as c FROM notices ${whereClause}`).get(...params).c;
  const rows = db.prepare(
    `SELECT id, title, department, publish_date, url, view_count FROM notices 
     ${whereClause} ORDER BY publish_date DESC LIMIT ? OFFSET ?`
  ).all(...params, limit, offset);

  res.json({ total, page, limit, data: rows });
});

// 查询单条通知详情
app.get('/api/notices/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM notices WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.listen(3000, () => console.log('🔍 查询服务已启动: http://localhost:3000/api/notices'));