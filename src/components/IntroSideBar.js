import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';



function IntroSideBar(props){
    const{title,description,social}=props;

    return(
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
            </Paper>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Social
            </Typography>
            {social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href={network.url}
                    key={network.name}
                    sx={{ mb: 0.5 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <network.icon />
                        <span>{network.name}</span>
                    </Stack>
                </Link>
            ))}
        </Grid>

    )
}


IntroSideBar.propTypes = {

    description: PropTypes.string.isRequired,
    social: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default IntroSideBar;
