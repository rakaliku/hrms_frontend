import React, { useEffect, useState } from 'react';
import Attendance from './Attendance';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface AttendanceRecord {
  employee_id: number;
  check_in: string;
  attendance_status: string;
  attendance_id: number;
  check_out: string | null;
}

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8004/attendance/all/');
        if (response.ok) {
          const data = await response.json();
          setAttendanceRecords(data);
        } else {
          console.error('Failed to fetch attendance records');
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendanceRecords();
  }, []);

  const filteredRecords = selectedDate
    ? attendanceRecords.filter(
        (record) => new Date(record.check_in).toDateString() === selectedDate.toDateString()
      )
    : attendanceRecords;

  const totalEmployees = attendanceRecords.length;
  const checkedIn = attendanceRecords.filter((record) => record.attendance_status === 'In').length;
  const checkedOut = attendanceRecords.filter((record) => record.attendance_status === 'Out').length;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="primary" fontWeight="bold">
            HRMS
          </Typography>
        </Toolbar>
        <List>
          <ListItem button component="a" href="/dashboard">
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component="a" href="/attendance">
            <ListItemIcon>
              <CalendarMonthIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
        </List>
      </Drawer>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 4 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography color="textSecondary">Welcome, Admin</Typography>
              <Avatar src="/avatar.png" />
            </Box>
          </Toolbar>
        </AppBar>
        {/* Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4" fontWeight="bold">{totalEmployees}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LoginIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Checked In</Typography>
                <Typography variant="h4" fontWeight="bold">{checkedIn}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LogoutIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Checked Out</Typography>
                <Typography variant="h4" fontWeight="bold">{checkedOut}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Calendar and Table */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Attendance Calendar
                </Typography>
                <Calendar
                  onChange={(date) => setSelectedDate(date as Date)}
                  value={selectedDate}
                  tileClassName={({ date }) => {
                    const isCheckedIn = attendanceRecords.some(
                      (record) => new Date(record.check_in).toDateString() === date.toDateString()
                    );
                    return isCheckedIn ? 'bg-green-200' : '';
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Attendance Records
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Employee ID</TableCell>
                          <TableCell>Check-In Time</TableCell>
                          <TableCell>Check-Out Time</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredRecords.map((record) => (
                          <TableRow key={record.attendance_id}>
                            <TableCell>{record.employee_id}</TableCell>
                            <TableCell>{new Date(record.check_in).toLocaleString()}</TableCell>
                            <TableCell>
                              {record.check_out ? new Date(record.check_out).toLocaleString() : 'N/A'}
                            </TableCell>
                            <TableCell>{record.attendance_status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Attendance Actions */}
        <Box sx={{ mt: 4 }}>
          <Attendance />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;