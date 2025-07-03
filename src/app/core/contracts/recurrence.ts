export enum Recurrence {
  Once,
  Daily,
  Weekly,
  Monthly,
  Yearly
}

export function getPeriodStartDate(date: Date, recurrence: Recurrence): Date {
  const editedDate = new Date(date); // клонируем дату, чтобы не мутировать оригинал
  editedDate.setHours(0, 0, 0, 0); // обнуляем время

  switch (recurrence) {
    case Recurrence.Daily:
      return editedDate;

    case Recurrence.Weekly:
      const day = editedDate.getDay();
      const diff = (day === 0 ? -6 : 1) - day;
      editedDate.setDate(editedDate.getDate() + diff);
      return editedDate;

    case Recurrence.Monthly:
      editedDate.setDate(1);
      return editedDate;

    case Recurrence.Yearly:
      editedDate.setMonth(0, 1);
      return editedDate;

    default:
      return editedDate;
  }
}

export function getPeriodEndDate(date: Date, recurrence: Recurrence): Date {
  const d = new Date(date); // копируем дату

  switch (recurrence) {
    case Recurrence.Daily:
      d.setHours(23, 59, 59, 999);
      return d;

    case Recurrence.Weekly:
      const day = d.getDay(); // 0 (вс) - 6 (сб)
      const diff = day === 0 ? 0 : 7 - day; // смещение к воскресенью
      d.setDate(d.getDate() + diff);
      d.setHours(23, 59, 59, 999);
      return d;

    case Recurrence.Monthly:
      d.setMonth(d.getMonth() + 1, 1);
      d.setHours(0, 0, 0, 0);
      d.setMilliseconds(d.getMilliseconds() - 1);
      return d;

    case Recurrence.Yearly:
      d.setFullYear(d.getFullYear() + 1, 0, 1);
      d.setHours(0, 0, 0, 0);
      d.setMilliseconds(d.getMilliseconds() - 1);
      return d;

    default:
      d.setHours(23, 59, 59, 999);
      return d;
  }
}

