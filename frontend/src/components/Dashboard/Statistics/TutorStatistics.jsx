import { useEffect, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrendingUp,
  FiChevronUp,
  FiChevronDown,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const COLORS = {
  accepted: "#10B981",
  pending: "#F59E0B",
  rejected: "#EF4444",
  total: "#6366F1",
  ongoing: "#8B5CF6",
  earnings: "#14B8A6",
  line: "#6366F1",
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

// ─── Toast ───────────────────────────────────────────────────────────────────
const Toast = ({ toasts }) => (
  <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all duration-300 ${
          t.type === "success" ? "bg-emerald-500" : "bg-red-500"
        }`}
      >
        {t.type === "success" ? (
          <FiCheck size={15} />
        ) : (
          <FiAlertTriangle size={15} />
        )}
        {t.message}
      </div>
    ))}
  </div>
);

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
          <FiTrash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-1">
          Delete Record
        </h3>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          This action cannot be undone. Are you sure?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiTrash2 size={14} /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Edit Slide Panel ─────────────────────────────────────────────────────────
const EditPanel = ({ isOpen, onClose, rowData, onSave, type, loading }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (rowData) setFormData({ ...rowData });
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-100 dark:border-gray-700 transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {type === "application"
                ? "Edit Application"
                : "Edit Ongoing Tuition"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Make your changes below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {type === "application" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications || ""}
                onChange={handleChange}
                placeholder="e.g. BSc in Mathematics"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-gray-300 dark:placeholder:text-gray-500"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Expected Salary (৳)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                ৳
              </span>
              <input
                type="number"
                name="expectedSalary"
                value={formData.expectedSalary || ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {type === "application" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience || ""}
                onChange={handleChange}
                placeholder="e.g. 2 years"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-gray-300 dark:placeholder:text-gray-500"
              />
            </div>
          )}

          {/* Status (read-only) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Current Status
            </label>
            <div className="px-4 py-2.5 text-sm rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  formData.status === "Accepted"
                    ? "bg-emerald-500"
                    : formData.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-amber-400"
                }`}
              />
              {formData.status || "—"}
              <span className="text-xs text-gray-400 ml-auto">(read-only)</span>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-2" />
          <p className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/30 rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-700">
            Only{" "}
            <strong className="text-gray-600 dark:text-gray-300">
              Pending
            </strong>{" "}
            applications can be edited.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData, type)}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiCheck size={14} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className="rounded-2xl border p-5 flex items-center gap-4 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}1A`, color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
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

// ─── DataTable ────────────────────────────────────────────────────────────────
function DataTable({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  disableIfNotPending = false,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = useMemo(() => {
    const vals = [...new Set(data.map((r) => r.status).filter(Boolean))];
    return ["All", ...vals];
  }, [data]);

  const filtered = useMemo(() => {
    let rows = data;
    if (statusFilter !== "All")
      rows = rows.filter((r) => r.status === statusFilter);
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
        const cmp = String(a[sortKey] ?? "").localeCompare(
          String(b[sortKey] ?? ""),
          undefined,
          { numeric: true },
        );
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
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
          <input
            className="pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-52"
            placeholder="Search…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          {statuses.length > 1 && (
            <select
              className="text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          )}
          <select
            className="text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                  className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FiFileText size={28} className="opacity-30" />
                    No records found.
                  </div>
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
                      <div className="flex items-center gap-1">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                            title="View"
                          >
                            <FiEye size={14} />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            disabled={
                              disableIfNotPending && row.status !== "Pending"
                            }
                            className="p-2 rounded-lg text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title={
                              disableIfNotPending && row.status !== "Pending"
                                ? "Only Pending can be edited"
                                : "Edit"
                            }
                          >
                            <FiEdit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            disabled={
                              disableIfNotPending && row.status !== "Pending"
                            }
                            className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title={
                              disableIfNotPending && row.status !== "Pending"
                                ? "Only Pending can be deleted"
                                : "Delete"
                            }
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
                <span key={`e-${idx}`} className="px-2">
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

// ─── Main Component ───────────────────────────────────────────────────────────
const TutorStatistics = () => {
  const { user } = useAuth();
  const base = "https://bdtuitions.vercel.app";

  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Panel
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalType, setModalType] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    row: null,
    type: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500,
    );
  };

  useEffect(() => {
    if (!user?.email) return;
    Promise.all([
      fetch(`${base}/applications/tutor/${user.email}`).then((r) => r.json()),
      fetch(`${base}/payments/tutor/${user.email}`).then((r) => r.json()),
      fetch(`${base}/tutor/ongoing/${user.email}`).then((r) => r.json()),
    ])
      .then(([apps, pays, ong]) => {
        setApplications(Array.isArray(apps) ? apps : []);
        setPayments(Array.isArray(pays) ? pays : []);
        setOngoing(Array.isArray(ong) ? ong : []);
      })
      .catch(() => showToast("Failed to load data", "error"))
      .finally(() => setLoading(false));
  }, [user]);

  // Edit
  const openEditPanel = (row, type) => {
    setSelectedRow(row);
    setModalType(type);
    setIsPanelOpen(true);
  };

  const handleSaveChanges = async (updatedData, type) => {
    setSaveLoading(true);
    try {
      const res = await fetch(
        `${base}/applications/update/${updatedData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            qualifications: updatedData.qualifications,
            experience: updatedData.experience,
            expectedSalary: updatedData.expectedSalary,
          }),
        },
      );
      if (res.ok) {
        setApplications((prev) =>
          prev.map((item) =>
            item._id === updatedData._id ? { ...item, ...updatedData } : item,
          ),
        );
        setIsPanelOpen(false);
        showToast("Application updated successfully!");
      } else {
        showToast("Failed to update on server.", "error");
      }
    } catch {
      showToast("An error occurred while updating.", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete
  const openDeleteModal = (row, type) => {
    setDeleteModal({ open: true, row, type });
  };

  const handleConfirmDelete = async () => {
    const { row, type } = deleteModal;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${base}/applications/${row._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (type === "application") {
          setApplications((prev) =>
            prev.filter((item) => item._id !== row._id),
          );
        } else if (type === "ongoing") {
          setOngoing((prev) => prev.filter((item) => item._id !== row._id));
        }
        setDeleteModal({ open: false, row: null, type: "" });
        showToast("Record deleted successfully!");
      } else {
        showToast("Failed to delete.", "error");
      }
    } catch {
      showToast("An error occurred.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Derived stats
  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(
    (a) => a.status === "Accepted",
  ).length;
  const pendingApplications = applications.filter(
    (a) => a.status === "Pending",
  ).length;
  const rejectedApplications = applications.filter(
    (a) => a.status === "Rejected",
  ).length;
  const totalEarnings = payments.reduce((s, p) => s + (p.amount || 0), 0);

  const pieData = [
    { name: "Accepted", value: acceptedApplications },
    { name: "Pending", value: pendingApplications },
    { name: "Rejected", value: rejectedApplications },
  ].filter((d) => d.value > 0);

  const monthlyBarData = useMemo(() => {
    const map = {};
    payments.forEach((p) => {
      const m = monthNames[new Date(p.paidAt).getMonth()];
      map[m] = (map[m] || 0) + (p.amount || 0);
    });
    return Object.entries(map).map(([month, amount]) => ({ month, amount }));
  }, [payments]);

  const lineData = useMemo(() => {
    const sorted = [...payments].sort(
      (a, b) => new Date(a.paidAt) - new Date(b.paidAt),
    );
    let cumulative = 0;
    return sorted.map((p) => {
      cumulative += p.amount || 0;
      return { date: fmtDate(p.paidAt), cumulative, amount: p.amount || 0 };
    });
  }, [payments]);

  const appColumns = [
    { key: "expectedSalary", label: "Salary (৳)", render: (v) => `৳${v ?? 0}` },
    { key: "appliedAt", label: "Applied", render: (v) => fmtDate(v) },
    { key: "status", label: "Status", render: (v) => <Badge status={v} /> },
  ];

  const ongoingColumns = [
    { key: "expectedSalary", label: "Salary (৳)", render: (v) => `৳${v ?? 0}` },
    {
      key: "appliedAt",
      label: "Started",
      render: (v) => (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {fmtDate(v)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Payment",
      render: (_, row) => {
        const isPaid =
          row.paymentStatus === "paid" || row.status === "Accepted";
        return (
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isPaid
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isPaid ? "bg-emerald-500" : "bg-amber-400"}`}
            />
            {isPaid ? "Paid" : "Unpaid"}
          </span>
        );
      },
    },
  ];

  const paymentColumns = [
    { key: "amount", label: "Amount (৳)", render: (v) => `৳${v ?? 0}` },
    { key: "paymentMethod", label: "Method" },
    { key: "paidAt", label: "Date", render: (v) => fmtDate(v) },
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
    <div className="min-h-screen mt-3 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-10 py-10">
      {/* Toast */}
      <Toast toasts={toasts} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Tutor Statistics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Full overview of your tutoring activity — applications, earnings &amp;
          sessions.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<FiFileText size={18} />}
          label="Total Applications"
          value={totalApplications}
          color={COLORS.total}
        />
        <StatCard
          icon={<FiCheckCircle size={18} />}
          label="Accepted"
          value={acceptedApplications}
          color={COLORS.accepted}
        />
        <StatCard
          icon={<FiClock size={18} />}
          label="Pending"
          value={pendingApplications}
          color={COLORS.pending}
        />
        <StatCard
          icon={<FiXCircle size={18} />}
          label="Rejected"
          value={rejectedApplications}
          color={COLORS.rejected}
        />
        <StatCard
          icon={<FiTrendingUp size={18} />}
          label="Ongoing"
          value={ongoing.length}
          color={COLORS.ongoing}
        />
        <StatCard
          icon={<FiCheckCircle size={18} />}
          label="Total Earnings"
          value={`৳${totalEarnings}`}
          color={COLORS.earnings}
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="Application Status">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Earnings (৳)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={monthlyBarData}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`৳${v}`, "Earnings"]} />
              <Bar
                dataKey="amount"
                fill={COLORS.accepted}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Cumulative Earnings Over Time">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={lineData}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`৳${v}`, "Cumulative"]} />
              <Legend iconType="circle" iconSize={10} />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke={COLORS.line}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.line }}
                activeDot={{ r: 5 }}
                name="Cumulative ৳"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Applications Table */}
      <div className="mb-6">
        <Card title={`My Applications (${totalApplications})`}>
          <DataTable
            columns={appColumns}
            data={applications}
            onView={(row) => showToast(`Viewing: ${row._id}`)}
            onEdit={(row) => openEditPanel(row, "application")}
            onDelete={(row) => openDeleteModal(row, "application")}
            disableIfNotPending={true}
          />
        </Card>
      </div>

      {/* Ongoing Tuitions Table */}
      <div className="mb-6">
        <Card title={`Ongoing Tuitions (${ongoing.length})`}>
          <DataTable columns={ongoingColumns} data={ongoing} />
        </Card>
      </div>

      {/* Payment History Table */}
      <div className="mb-6">
        <Card title={`Payment History — Total ৳${totalEarnings}`}>
          <DataTable
            columns={paymentColumns}
            data={payments}
            onView={(row) => showToast(`Viewing: ${row._id}`)}
          />
        </Card>
      </div>

      {/* Edit Slide Panel */}
      <EditPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        rowData={selectedRow}
        onSave={handleSaveChanges}
        type={modalType}
        loading={saveLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, row: null, type: "" })}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default TutorStatistics;
