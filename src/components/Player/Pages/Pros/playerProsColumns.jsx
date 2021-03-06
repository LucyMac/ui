import React from 'react';
import { Link } from 'react-router';
import { getPercentWin, transformations } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

export default playerId => [{
  displayName: strings.th_avatar,
  field: 'last_played',
  displayFn: transformations.player,
  sortFn: true,
}, {
  displayName: strings.th_matches,
  tooltip: strings.tooltip_matches,
  field: '',
  sortFn: row => row.with_games + row.against_games,
  displayFn: row => (<div>
    <Link to={`/players/${playerId}/matches?included_account_id=${row.account_id}`}>{row.with_games + row.against_games}</Link>
  </div>),
}, {
  displayName: strings.th_with_games,
  tooltip: strings.tooltip_played_with,
  field: 'with_games',
  sortFn: true,
}, {
  displayName: strings.th_with_win,
  tooltip: strings.tooltip_win_pct_with,
  field: 'with_win',
  displayFn: row => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: row => row.with_win / row.with_games,
}, {
  displayName: strings.th_against_games,
  tooltip: strings.tooltip_played_against,
  field: 'against_games',
  sortFn: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.tooltip_win_pct_against,
  field: 'against_win',
  displayFn: row => <TablePercent val={getPercentWin(row.against_win, row.against_games)} />,
  sortFn: row => row.against_win / row.against_games,
}];
