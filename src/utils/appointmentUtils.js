const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});

export const formatAppointmentDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return dateFormatter.format(parsedDate);
};

export const formatAppointmentTime = (time) => {
  if (!time) return "Time unavailable";

  const match = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(time);

  if (!match) return "Time unavailable";

  const [, hours, minutes, seconds = "0"] = match;
  const parsedTime = new Date(2000, 0, 1);
  parsedTime.setHours(Number(hours), Number(minutes), Number(seconds), 0);

  return timeFormatter.format(parsedTime);
};

export const getAppointmentStatus = (status) => {
  const statuses = {
    SCHEDULED: {
      label: "Scheduled",
      className: "confirmed"
    },
    COMPLETED: {
      label: "Completed",
      className: "completed"
    },
    CANCELLED: {
      label: "Cancelled",
      className: "cancelled"
    }
  };

  return (
    statuses[status] ?? {
      label: status ?? "Unknown",
      className: "pending"
    }
  );
};

export const getAppointmentStats = (appointments) => ({
  total: appointments.length,
  scheduled: appointments.filter(({ status }) => status === "SCHEDULED").length,
  completed: appointments.filter(({ status }) => status === "COMPLETED").length
});
