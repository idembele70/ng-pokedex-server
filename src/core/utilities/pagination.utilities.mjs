export default class PaginationUtilities {
  static fallbackLimit = 15;
  static initialPage = 1;

  static parsePagination(query) {
    const limit = Number.parseInt(query?.limit) || this.fallbackLimit;
    const page = Number.parseInt(query?.page) || this.initialPage;
    const offset = (page - this.initialPage) * limit;

    return {
      limit,
      page,
      offset
    }
  }
}