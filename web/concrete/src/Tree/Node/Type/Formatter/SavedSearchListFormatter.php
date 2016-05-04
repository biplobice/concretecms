<?php
namespace Concrete\Core\Tree\Node\Type\Formatter;

class SavedSearchListFormatter implements ListFormatterInterface
{
    public function getIconElement()
    {
        return '<i class="fa fa-cog"></i>';
    }

    public function getSearchResultsClass()
    {
        return 'ccm-search-results-folder';
    }

}