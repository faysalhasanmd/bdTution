import { useEffect, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FiFileText,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCreditCard,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

// ─── Design Tokens ──────────────────────────────────────────────────────────
const COLORS = {
  accepted: "#10B981",
  pending: "#F59E0B",
  rejected: "#EF4444",
  total: "#6366F1",
  ongoing: "#8B5CF6",
  spent: "#EF4444",
};
const PIE_COLORS = [COLORS.accepted, COLORS.pending, COLORS.rejected];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function fmtDate(val) {
  return val ? new Date(val).toLocaleDateString("en-GB") : "—";
}

// ─── Sub-components ──────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className="rounded-2xl border p-5 flex items-center gap-4 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}1A`, color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tabular-nums">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200">
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Badge = ({ status }) => {
  const map = {
    Pending:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    Approved:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    Accepted:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    Rejected: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    paid: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${map[status] || "bg-gray-100 text-gray-500"}`}
    >
      {status}
    </span>
  );
};

// ─── Sortable, Filterable, Paginated Table ─────────────────────────────────
function DataTable({ columns, data, onView, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = useMemo(() => {
    const vals = [
      ...new Set(data.map((r) => r.status || r.paymentStatus).filter(Boolean)),
    ];
    return ["All", ...vals];
  }, [data]);

  const filtered = useMemo(() => {
    let rows = data;

    if (statusFilter !== "All") {
      rows = rows.filter(
        (r) => r.status === statusFilter || r.paymentStatus === statusFilter,
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        columns.some((c) =>
          String(r[c.key] ?? "")
            .toLowerCase()
            .includes(q),
        ),
      );
    }

    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        const cmp = String(av).localeCompare(String(bv), undefined, {
          numeric: true,
        });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, sortKey, sortDir, statusFilter, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey)
      return <FiChevronUp className="opacity-20" size={12} />;
    return sortDir === "asc" ? (
      <FiChevronUp size={12} className="text-indigo-500" />
    ) : (
      <FiChevronDown size={12} className="text-indigo-500" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
          <input
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-52"
            placeholder="Search…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          {/* Status filter */}
          {statuses.length > 1 && (
            <select
              className="text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          {/* Page size */}
          <select
            className="text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                Show {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/60">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  onClick={() => toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon colKey={col.key} />
                  </span>
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-10 text-center text-gray-400 dark:text-gray-500 text-sm"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row._id || i}
                  className="border-t border-gray-50 dark:border-gray-700/50 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="py-3 px-4 text-gray-700 dark:text-gray-300"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] ?? "—")}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                            title="View"
                          >
                            <FiEye size={14} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
          {Math.min(safePage * pageSize, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1,
            )
            .reduce((acc, n, idx, arr) => {
              if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…");
              acc.push(n);
              return acc;
            }, [])
            .map((item, idx) =>
              item === "…" ? (
                <span key={`ellipsis-${idx}`} className="px-2">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                    safePage === item
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Student Component ───────────────────────────────────────────────────
const StudentStatistics = () => {
  const { user } = useAuth();

  const [tuitions, setTuitions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const base = "https://tuitionsbd.vercel.app";

    Promise.all([
      fetch(`${base}/tuition?email=${user.email}`).then((r) => r.json()),
      fetch(`${base}/applications/student/${user.email}`).then((r) => r.json()),
      fetch(`${base}/payments/student/${user.email}`).then((r) => r.json()),
    ])
      .then(([t, a, p]) => {
        setTuitions(Array.isArray(t) ? t : []);
        setApplications(Array.isArray(a) ? a : []);
        setPayments(Array.isArray(p) ? p : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  // ── Action handlers ────────────────────────────────────────────────────────
  const handleView = (row) => alert(`View Details: ${row._id}`);
  const handleEdit = (row) => alert(`Edit Details: ${row._id}`);
  const handleDelete = (row) => {
    if (window.confirm("Are you sure to delete this record?"))
      alert(`Deleted: ${row._id}`);
  };

  // ── Derived numbers ────────────────────────────────────────────────────────
  const totalTuitions = tuitions.length;
  const approvedTuitions = tuitions.filter(
    (t) => t.status === "Approved",
  ).length;
  const pendingTuitions = tuitions.filter((t) => t.status === "Pending").length;

  const totalApps = applications.length;
  const acceptedApps = applications.filter(
    (a) => a.status === "Accepted",
  ).length;
  const pendingApps = applications.filter((a) => a.status === "Pending").length;
  const rejectedApps = applications.filter(
    (a) => a.status === "Rejected",
  ).length;

  const totalSpent = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((s, p) => s + (p.amount || 0), 0);

  // ── Pie chart data ─────────────────────────────────────────────────────────
  const appPieData = [
    { name: "Accepted", value: acceptedApps },
    { name: "Pending", value: pendingApps },
    { name: "Rejected", value: rejectedApps },
  ].filter((d) => d.value > 0);

  // ── Bar chart — Tuitions by subject ────────────────────────────────────────
  const subjectData = useMemo(() => {
    const subjectMap = {};
    tuitions.forEach((t) => {
      const sub = t.subject || "Other";
      subjectMap[sub] = (subjectMap[sub] || 0) + 1;
    });
    return Object.entries(subjectMap).map(([subject, count]) => ({
      subject,
      count,
    }));
  }, [tuitions]);

  // ── Bar chart — Monthly cost breakdown ─────────────────────────────────────
  const monthlyData = useMemo(() => {
    const monthlyMap = {};
    payments
      .filter((p) => p.paymentStatus === "paid")
      .forEach((p) => {
        const d = new Date(p.paidAt);
        const key = monthNames[d.getMonth()];
        monthlyMap[key] = (monthlyMap[key] || 0) + (p.amount || 0);
      });
    return Object.entries(monthlyMap).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [payments]);

  // ── Table column definitions ───────────────────────────────────────────────
  const tuitionColumns = [
    { key: "class", label: "Class/Course" },
    { key: "subject", label: "Subject" },
    { key: "salary", label: "Salary (৳)", render: (v) => `৳${v ?? 0}` },
    { key: "status", label: "Status", render: (v) => <Badge status={v} /> },
  ];

  const appColumns = [
    { key: "tutorEmail", label: "Tutor Email" },
    { key: "qualifications", label: "Qualifications" },
    { key: "appliedAt", label: "Applied Date", render: (v) => fmtDate(v) },
    { key: "status", label: "Status", render: (v) => <Badge status={v} /> },
  ];

  const paymentColumns = [
    { key: "amount", label: "Amount (৳)", render: (v) => `৳${v ?? 0}` },
    { key: "paymentMethod", label: "Method" },
    { key: "paidAt", label: "Paid At", render: (v) => fmtDate(v) },
    {
      key: "paymentStatus",
      label: "Status",
      render: (v) => <Badge status={v} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-10 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          My Statistics
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Overview of your tuitions, applications, and payments.
        </p>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<FiFileText size={18} />}
          label="Total Tuitions"
          value={totalTuitions}
          color={COLORS.total}
        />
        <StatCard
          icon={<FiCheckCircle size={18} />}
          label="Approved Tuitions"
          value={approvedTuitions}
          color={COLORS.accepted}
        />
        <StatCard
          icon={<FiClock size={18} />}
          label="Pending Tuitions"
          value={pendingTuitions}
          color={COLORS.pending}
        />
        <StatCard
          icon={<FiUsers size={18} />}
          label="Total Applications"
          value={totalApps}
          color={COLORS.ongoing}
        />
        <StatCard
          icon={<FiCheckCircle size={18} />}
          label="Accepted Applications"
          value={acceptedApps}
          color={COLORS.accepted}
        />
        <StatCard
          icon={<FiCreditCard size={18} />}
          label="Total Spent"
          value={`৳${totalSpent}`}
          color={COLORS.spent}
        />
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Application status pie */}
        <Card title="Application Status Breakdown">
          {appPieData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No application data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={appPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {appPieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Tuitions by subject bar */}
        <Card title="Tuitions by Subject">
          {subjectData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No tuition data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={subjectData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [v, "Count"]} />
                <Bar
                  dataKey="count"
                  fill={COLORS.total}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Monthly Cost breakdown */}
        <Card title="Monthly Cost Breakdown (৳)">
          {monthlyData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No payment data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={monthlyData}
                margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`৳${v}`, "Spent"]} />
                <Bar
                  dataKey="amount"
                  fill={COLORS.spent}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* ── My Tuitions Table ────────────────────────────────────────────── */}
      <div className="mb-6">
        <Card title={`My Tuitions (${totalTuitions})`}>
          <DataTable
            columns={tuitionColumns}
            data={tuitions}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>

      {/* ── Received Applications Table ───────────────────────────────────── */}
      <div className="mb-6">
        <Card title={`Received Applications (${totalApps})`}>
          <DataTable
            columns={appColumns}
            data={applications}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>

      {/* ── Payment History Table ─────────────────────────────────────────── */}
      <Card title={`Payment History — Total Spent ৳${totalSpent}`}>
        <DataTable
          columns={paymentColumns}
          data={payments}
          onView={handleView}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
};

export default StudentStatistics;
