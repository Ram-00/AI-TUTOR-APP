import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Fade,
  ClickAwayListener
} from '@mui/material';
import {
  Search as SearchIcon,
  Mic as MicIcon,
  Description,
  Dashboard,
  School,
  Assignment,
  Create,
  AutoFixHigh
} from '@mui/icons-material';

// Search suggestions database
const searchDatabase = {
  dashboard: {
    path: '/dashboard',
    icon: <Dashboard />,
    suggestions: [
      { text: 'View quick stats', description: 'Access overview of pending tasks' },
      { text: 'Recent activities', description: 'View your latest actions' },
      { text: 'Quick access menu', description: 'Navigate to frequently used features' }
    ]
  },
  paperEvaluation: {
    path: '/paper-evaluation',
    icon: <Description />,
    suggestions: [
      { text: 'Evaluate answer sheets', description: 'Start evaluating pending papers' },
      { text: 'View evaluation history', description: 'Access previously evaluated papers' },
      { text: 'Evaluation guidelines', description: 'View marking scheme and rules' }
    ]
  },
  questionPaper: {
    path: '/question-paper',
    icon: <Create />,
    suggestions: [
      { text: 'Generate new question paper', description: 'Create a new question paper' },
      { text: 'Question bank', description: 'Access question repository' },
      { text: 'Previous papers', description: 'View generated question papers' }
    ]
  },
  synopsis: {
    path: '/synopsis-for-teachers',
    icon: <School />,
    suggestions: [
      { text: 'Create new synopsis', description: 'Write new teaching synopsis' },
      { text: 'View existing synopsis', description: 'Access saved synopsis' },
      { text: 'Synopsis templates', description: 'Use pre-defined templates' }
    ]
  },
  homework: {
    path: '/homework-correction',
    icon: <Assignment />,
    suggestions: [
      { text: 'Pending homework', description: 'View homework awaiting correction' },
      { text: 'Correction history', description: 'Access previously corrected homework' },
      { text: 'Student submissions', description: 'View student homework submissions' }
    ]
  },
  lessonPlanning: {
    path: '/ai-lesson-planning',
    icon: <AutoFixHigh />,
    suggestions: [
      { text: 'Create AI lesson plan', description: 'Generate new lesson plan using AI' },
      { text: 'View saved plans', description: 'Access existing lesson plans' },
      { text: 'AI suggestions', description: 'Get AI-powered teaching suggestions' }
    ]
  }
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const getSuggestions = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    let matchedSuggestions = [];

    Object.entries(searchDatabase).forEach(([category, data]) => {
      data.suggestions.forEach(suggestion => {
        const searchText = `${suggestion.text} ${suggestion.description}`.toLowerCase();
        const isMatch = searchTerms.every(term => searchText.includes(term));

        if (isMatch) {
          matchedSuggestions.push({
            ...suggestion,
            category,
            icon: data.icon,
            path: data.path
          });
        }
      });
    });

    return matchedSuggestions.slice(0, 6); // Limit to 6 suggestions
  };

  useEffect(() => {
    if (searchValue.trim()) {
      const newSuggestions = getSuggestions(searchValue);
      setSuggestions(newSuggestions);
      setAnchorEl(inputRef.current);
    } else {
      setSuggestions([]);
      setAnchorEl(null);
    }
  }, [searchValue]);

  const handleSuggestionClick = (path) => {
    setSearchValue('');
    setSuggestions([]);
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 800, zIndex: 1000 }}>
        <Paper
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 28,
            backgroundColor: 'white',
          }}
        >
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            ref={inputRef}
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton sx={{ p: '10px' }}>
            <MicIcon />
          </IconButton>
        </Paper>

        <Popper
          open={Boolean(anchorEl) && suggestions.length > 0}
          anchorEl={anchorEl}
          placement="top"
          transition
          sx={{ width: '100%', maxWidth: 800, mt: 1 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={3} sx={{ mt: -2, maxHeight: 400, overflow: 'auto' }}>
                <List>
                  {suggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSuggestionClick(suggestion.path)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                      }}
                    >
                      <ListItemIcon>{suggestion.icon}</ListItemIcon>
                      <ListItemText
                        primary={suggestion.text}
                        secondary={suggestion.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar; 