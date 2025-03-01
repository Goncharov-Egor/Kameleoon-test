import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Test, TestWithSite, Type, Status } from '../../types';
import { fetchTests, fetchSites } from '../../services/api';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<TestWithSite[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof TestWithSite; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  
  // Генерация случайных цветов для карточек
  const cardColors = useMemo(() => {
    const colors = ['#FF5C5C', '#FFA500', '#2EE5AC', '#4A90E2', '#9B59B6', '#F1C40F', '#E74C3C', '#3498DB'];
    return tests.reduce((acc, test) => {
      acc[test.id] = colors[Math.floor(Math.random() * colors.length)];
      return acc;
    }, {} as Record<number, string>);
  }, [tests]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [testsData, sitesData] = await Promise.all([fetchTests(), fetchSites()]);
        const testsWithSites = testsData.map(test => ({
          ...test,
          site: sitesData.find(site => site.id === test.siteId)?.url.replace(/^(https?:\/\/)(www\.)?/, '') || ''
        }));
        setTests(testsWithSites);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleSort = (key: keyof TestWithSite) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortedTests = () => {
    const filteredTests = tests.filter(test =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filteredTests].sort((a, b) => {
      if (sortConfig.key === 'status') {
        const statusOrder = {
          [Status.ONLINE]: 1,
          [Status.PAUSED]: 2,
          [Status.STOPPED]: 3,
          [Status.DRAFT]: 4
        };
        return sortConfig.direction === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }

      const compareResult = a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString());
      return sortConfig.direction === 'asc' ? compareResult : -compareResult;
    });
  };

  const handleAction = (testId: number, action: 'results' | 'finalize') => {
    navigate(`/${action}/${testId}`);
  };

  const sortedTests = getSortedTests();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="What test are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className={styles.testsCount}>{sortedTests.length} tests</span>
        </div>
      </div>

      {sortedTests.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>NAME</th>
              <th onClick={() => handleSort('type')}>TYPE</th>
              <th onClick={() => handleSort('status')}>STATUS</th>
              <th onClick={() => handleSort('site')}>SITE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sortedTests.map(test => (
              <tr key={test.id}>
                <td style={{ borderLeftColor: cardColors[test.id] }}>{test.name}</td>
                <td>{test.type}</td>
                <td>
                  <span className={styles[test.status.toLowerCase()]}>
                    {test.status}
                  </span>
                </td>
                <td>{test.site}</td>
                <td>
                  {test.status === Status.DRAFT ? (
                    <button
                      className={styles.finalizeButton}
                      onClick={() => handleAction(test.id, 'finalize')}
                    >
                      Finalize
                    </button>
                  ) : (
                    <button
                      className={styles.actionButton}
                      onClick={() => handleAction(test.id, 'results')}
                    >
                      Results
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.noResults}>
          <p>Your search did not match any results.</p>
          <button
            className={styles.resetButton}
            onClick={() => setSearchQuery('')}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;