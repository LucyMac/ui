import React from 'react';
import strings from 'lang';
import Heading from 'components/Heading';
import Table from 'components/Table';
import TeamfightMap from 'components/Match/TeamfightMap';
import VisionPage from './VisionPage';
import CastTable from './CastTable';
import CrossTable from './CrossTable';
import MatchGraph from './MatchGraph';
import MatchLog from './MatchLog';
import {
  // abilityUpgradeColumns,
  benchmarksColumns,
  performanceColumns,
  supportColumns,
  chatColumns,
  purchaseTimesColumns,
  lastHitsTimesColumns,
  unitKillsColumns,
  actionsColumns,
  runesColumns,
  cosmeticsColumns,
  goldReasonsColumns,
  xpReasonsColumns,
  objectiveDamageColumns,
  analysisColumns,
  inflictorsColumns,
} from './matchColumns';
import Overview from './Overview';
import TeamTable from './TeamTable';
import styles from './Match.css';

const matchPages = [Overview, {
  name: strings.tab_benchmarks,
  key: 'benchmarks',
  content: match => (<div>
    <TeamTable players={match.players} columns={benchmarksColumns(match)} heading={strings.heading_benchmarks} />
  </div>),
}, {
  name: strings.tab_performances,
  key: 'performances',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={performanceColumns} heading={strings.heading_performances} />
    <TeamTable players={match.players} columns={supportColumns} heading={strings.heading_support} />
  </div>),
}, {
  name: strings.tab_combat,
  key: 'combat',
  parsed: true,
  content: match => (<div>
    <div className={styles.flexContainer}>
      <div className={styles.flexElement}>
        <Heading title={strings.heading_kills} />
        <CrossTable match={match} field1="killed" field2="killed_by" />
      </div>
      <div className={styles.flexElement}>
        <Heading title={strings.heading_damage} />
        <CrossTable match={match} field1="damage" field2="damage_taken" />
      </div>
    </div>
    <TeamTable players={match.players} columns={inflictorsColumns} heading={strings.heading_damage} />
  </div>),
}, {
  name: strings.tab_farm,
  key: 'farm',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={unitKillsColumns} heading={strings.heading_unit_kills} />
    <TeamTable players={match.players} columns={lastHitsTimesColumns(match)} heading={strings.heading_last_hits} />
    <div className={styles.flexContainer}>
      <div className={styles.flexElement}>
        <TeamTable players={match.players} columns={goldReasonsColumns} heading={strings.heading_gold_reasons} />
      </div>
      <div className={styles.flexElement}>
        <TeamTable players={match.players} columns={xpReasonsColumns} heading={strings.heading_xp_reasons} />
      </div>
    </div>
  </div>),
}, {
  name: strings.tab_purchases,
  key: 'purchases',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={purchaseTimesColumns(match)} heading={strings.heading_purchase_log} />
  </div>),
}, {
  name: strings.tab_graphs,
  key: 'graphs',
  parsed: true,
  content: match => (<div>
    <MatchGraph match={match} type="difference" />
    <MatchGraph match={match} type="gold" />
    <MatchGraph match={match} type="xp" />
    <MatchGraph match={match} type="lh" />
  </div>),
}, {
  name: strings.tab_casts,
  key: 'casts',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_casts} />
    <CastTable match={match} />
  </div>),
}, {
  name: strings.tab_objectives,
  key: 'objectives',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={objectiveDamageColumns} heading={strings.heading_objective_damage} />
    <TeamTable players={match.players} columns={runesColumns} heading={strings.heading_runes} />
  </div>),
}, {
  name: strings.tab_vision,
  key: 'vision',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_vision} />
    <VisionPage match={match} />
  </div>),
}, {
  name: strings.tab_actions,
  key: 'actions',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={actionsColumns} heading={strings.heading_actions} />
  </div>),
}, {
  name: strings.tab_teamfights,
  key: 'teamfights',
  parsed: true,
  content: match => (
    <div>
      <TeamfightMap teamfights={match.teamfights} match={match} />
    </div>),
}, {
  name: strings.tab_analysis,
  key: 'analysis',
  parsed: true,
  content: match => (<div>
    <TeamTable players={match.players} columns={analysisColumns} heading={strings.heading_analysis} />
  </div>),
}, {
  name: strings.tab_cosmetics,
  key: 'cosmetics',
  parsed: true,
  content: match => (
    <div>
      <Heading title={strings.heading_cosmetics} />
      <Table data={match.players.filter(obj => obj.cosmetics.length > 0)} columns={cosmeticsColumns} />
    </div>
  ),
}, {
  name: strings.tab_log,
  key: 'log',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_log} />
    <MatchLog match={match} />
  </div>),
}, {
  name: strings.tab_chat,
  key: 'chat',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_chat} />
    <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
  </div>),
}];

export default (matchId, match) => matchPages.map(page => ({
  ...page,
  route: `/matches/${matchId}/${page.name.toLowerCase()}`,
  disabled: match && !match.version && page.parsed,
}));
