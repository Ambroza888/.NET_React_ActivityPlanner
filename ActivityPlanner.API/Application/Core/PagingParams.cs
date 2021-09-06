namespace Application.Core
{
  public class PagingParams
  {

    private int _pageSize = 5;
    private const int MaxPageSize = 30;
    public int PageNumber { get; set; } = 1;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

  }
}