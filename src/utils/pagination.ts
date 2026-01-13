import type { GetColumnData, SQL, SQLWrapper } from "drizzle-orm";
import { gt } from "drizzle-orm";
import type { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE = 1;

export function withSimplePagination<TSelect extends PgSelect, TColumn extends PgColumn | SQL | SQL.Aliased>(
  qb: TSelect,
  orderByColumn: TColumn,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE
): TSelect {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export function withCursorPagination<TSelect extends PgSelect, TColumn extends PgColumn>(
  qb: TSelect,
  orderByColumn: TColumn,
  cursor?: GetColumnData<TColumn, "raw"> | SQLWrapper,
  pageSize = DEFAULT_PAGE_SIZE
): TSelect {
  if (cursor) {
    return qb.where(gt(orderByColumn, cursor)).orderBy(orderByColumn).limit(pageSize);
  }

  return qb.orderBy(orderByColumn).limit(pageSize);
}
